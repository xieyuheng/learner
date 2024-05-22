import { zip } from "../../utils/zip.js"
import {
  assertTensorArray,
  isScalar,
  rank,
  type Scalar,
  type Tensor,
} from "../tensor/index.js"

export function extend2(
  fn: (x: Scalar, y: Scalar) => Scalar,
): (x: Tensor, y: Tensor) => Tensor {
  return function extendedFn(x: Tensor, y: Tensor): Tensor {
    if (rank(x) > rank(y)) {
      assertTensorArray(x)
      return x.map((x) => extendedFn(x, y))
    }

    if (rank(x) < rank(y)) {
      assertTensorArray(y)
      return y.map((y) => extendedFn(x, y))
    }

    return extendedFnSameShape(x, y)
  }

  function extendedFnSameShape(x: Tensor, y: Tensor): Tensor {
    if (isScalar(x) && isScalar(y)) {
      return fn(x, y)
    }

    assertTensorArray(x)
    assertTensorArray(y)

    return zip(x, y).map(([x, y]) => extendedFnSameShape(x, y))
  }
}

export function extend1<A, B extends Tensor>(
  fn: (x: A) => B,
  baseRank: number,
): (x: Tensor) => Tensor {
  return function extendedFn(x: Tensor): Tensor {
    if (rank(x) === baseRank) {
      return fn(x as A)
    }

    assertTensorArray(x)
    return x.map(extendedFn)
  }
}
