---
title: Extending function of subtype to supertype
date: 2024-05-22
---

# 问题

已知

```typescript
type Tensor = Scalar | Array<Tensor>
```

我们要把类型为 `(x: Scalar) => Scalar` 的函数，
扩展为类型为 `(x: Tensor) => Tensor` 的函数。

因为扩展的是单参数的函数，
所以我们称这个扩展函数为 `extend1`，
我们原本可以将其定义为：

```typescript
function extend1(
  fn: (x: Scalar) => Scalar,
  baseRank: number,
): (x: Tensor) => Tensor {
  return function extendedFn(x: Tensor): Tensor {
    if (isScalar(x)) {
      return fn(x)
    }

    return x.map((x) => extendedFn(x))
  }
}
```

但是，由于我们同时要用它来扩展 `sum1(xs: Array<Scalar>): Scalar`，
并且函数的参数位置是 contravariant 的，
所以实际的定义中不得不用到一个 `as` 来强制转换 `x` 的类型：

```typescript
function extend1<A, B extends Tensor>(
  fn: (x: A) => B,
  baseRank: number,
): (x: Tensor) => Tensor {
  return function extendedFn(x: Tensor): Tensor {
    if (rank(x) === baseRank) {
      return fn(x as A)
    }

    assertTensorArray(x)
    return x.map((x) => extendedFn(x))
  }
}
```

# 尝试用 dependent 解决

假设有 dependent type，应该如何避免类型强制转换呢？

假设让 `Tensor` 直接带有 rank，
就像 `Matrix` 带有 shape，
和 `Vector` 带有 length（即 shape）。

注意，我们没有 union type，
只能用 algebraic data type。

```cicada
datatype Tensor(rank: Nat) {
  Scalar(n: Number): Tensor(0)
  Array(array: Array(Tensor(rank))): Tensor(add1(rank))
}

check Tensor::Scalar(1): Tensor(0)
check Tensor::Array([
  Tensor::Scalar(1),
  Tensor::Scalar(2),
  Tensor::Scalar(3),
]): Tensor(1)
```

尝试定义 `extend1`，但是好像也不对，
并且还是需要 assertion 才能调用 `arrayMap`。

```cicada
function extend1(
  implicit baseRank: Nat,
  implicit resultRank: Nat,
  fn: (Tensor(baseRank)) -> Tensor(resultRank),
): (
  implicit inputRank: Nat,
  implicit outputRank: Nat,
  x: Tensor(inputRank)
) => Tensor(outputRank) {
  function extendedFn(implicit inputRank, implicit outputRank, x) {
    if (inputRank === baseRank) {
      fn(x)
    }

    let Tensor::Array(xs) = x
    arrayMap(xs, extendedFn)
  }
}
```

假设我们不给 `Tensor` 带参数：

```cicada
datatype Tensor {
  Scalar(n: Number): Tensor
  Array(array: Array(Tensor)): Tensor
}

check Tensor::Scalar(1): Tensor
check Tensor::Array([
  Tensor::Scalar(1),
  Tensor::Scalar(2),
  Tensor::Scalar(3),
]): Tensor
```

再尝试定义 `extend1`，看起来也是不行的，
并且我发现，其实当我们用 `datatype` 而不能用 union 的时候，
已经把工作转嫁给了调用 `extend1` 的函数。

```cicada
function extend1(
  fn: (Tensor) -> Tensor,
  baseRank: Nat
): (Tensor) -> Tensor {
  function extendedFn(x) {
    if (natEqual(rank(x), baseRank)) {
      fn(x)
    }

    let Tensor::Array(xs) = x
    arrayMap(xs, extendedFn)
  }
}
```

也许 Tensor 应该直接被定义为一个函数：

```cicada
function Tensor(n: Nat): Type {
  match (n) {
    case Nat::Zero => Scalar
    case Nat::Add1(prev) => Array(Tensor(prev))
  }
}

check 1: Tensor(0)
check [1, 2, 3]: Tensor(1)
```

好像还是不行，并且没法用 implicit 了。

```cicada
function extend1(
  baseRank: Nat
  resultRank: Nat
  fn: (Tensor(baseRank)) -> Tensor(resultRank),
): (Tensor) -> Tensor {
  function extendedFn(x) {
    if (natEqual(rank(x), baseRank)) {
      fn(x)
    }

    TODO
  }
}
```
