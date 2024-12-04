import { zip } from "../utils/zip.ts"
import {
  assertNotScalar,
  assertTensor1,
  isScalar,
  rank,
  type Tensor,
} from "./chapter-2.ts"

export function extend2(
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

export const add = extend2((x, y) => x + y)
export const sub = extend2((x, y) => x - y)
export const mul = extend2((x, y) => x * y)

export function extend1(fn: (x: number) => number): (x: Tensor) => Tensor {
  return function extendedFn(x: Tensor): Tensor {
    if (isScalar(x)) {
      return fn(x)
    }

    return x.map((x) => extendedFn(x))
  }
}

export const squareRoot = extend1(Math.sqrt)
export const square = extend1((x) => x * x)

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

export function line(x: Tensor): (ps: [number, number]) => Tensor {
  return (ps) => add(mul(ps[0], x), ps[1])
}
