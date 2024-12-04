import type { Scalar, Tensor } from "../../tensor/index.ts"
import { extend1, lt } from "../../toys/index.ts"
import { linear } from "./linear.ts"

export function rectifyScalar(s: Scalar): Scalar {
  return lt(s, 0) ? 0 : s
}

export const rectify = extend1(rectifyScalar, 0)

// NOTE The name relu is short for
// rectifying linear unit.

export function relu(t: Tensor): (weight: Tensor, bias: Tensor) => Tensor {
  return (weight, bias) => rectify(linear(t)(weight, bias))
}
