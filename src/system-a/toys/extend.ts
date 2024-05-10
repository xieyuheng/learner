import { zip } from "../../utils/zip.js"
import {
  assertNotScalar,
  isScalar,
  rank,
  type Scalar,
  type Tensor,
} from "../index.js"

export function extend2(
  fn: (x: Scalar, y: Scalar) => Scalar,
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

export function extend1(fn: (x: Scalar) => Scalar): (x: Tensor) => Tensor {
  return function extendedFn(x: Tensor): Tensor {
    if (isScalar(x)) {
      return fn(x)
    }

    return x.map((x) => extendedFn(x))
  }
}
