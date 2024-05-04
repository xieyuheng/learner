import { zip } from "../utils/zip.js"
import {
  assertNotScalar,
  assertTensor1,
  isScalar,
  rank,
  type Tensor,
} from "./chapter-2.js"

export function extendBinaryFunction(
  fn: (x: number, y: number) => number,
): (x: Tensor, y: Tensor) => Tensor {
  return function extendedFn(x: Tensor, y: Tensor): Tensor {
    if (rank(x) > rank(y)) {
      assertNotScalar(x)
      return x.map((x) => extendedFn(x, y))
    }

    if (rank(x) < rank(y)) {
      assertNotScalar(y)
      return y.map((y) => extendedFn(x, y))
    }

    return extendedFnSameShape(x, y)
  }

  function extendedFnSameShape(x: Tensor, y: Tensor): Tensor {
    if (isScalar(x) && isScalar(y)) {
      return fn(x, y)
    }

    assertNotScalar(x)
    assertNotScalar(y)

    return zip(x, y).map(([x, y]) => extendedFnSameShape(x, y))
  }
}

export const add = extendBinaryFunction((x, y) => x + y)
export const sub = extendBinaryFunction((x, y) => x - y)
export const mul = extendBinaryFunction((x, y) => x * y)

export function extendUnaryFunction(
  fn: (x: number) => number,
): (x: Tensor) => Tensor {
  return function extendedFn(x: Tensor): Tensor {
    if (isScalar(x)) {
      return fn(x)
    }

    return x.map((x) => extendedFn(x))
  }
}

export const sqrt = extendUnaryFunction(Math.sqrt)
export const square = extendUnaryFunction((x) => x * x)

export function sum1(xs: Array<number>): number {
  return xs.reduce((x, result) => x + result, 0)
}

export function sum(x: Tensor): Tensor {
  assertNotScalar(x)
  if (rank(x) === 1) {
    assertTensor1(x)
    return sum1(x)
  }

  return x.map((x) => sum(x))
}

export function line(x: Tensor): (θ: [number, number]) => Tensor {
  return (θ) => add(mul(θ[0], x), θ[1])
}
