import type { Scalar, Tensor } from "../../tensor/index.ts"
import { extend1, lt, mul } from "../../toys/index.ts"
import { linear } from "./linear.ts"

export function leakyRectifyScalar(s: Scalar): Scalar {
  return lt(s, 0) ? (mul(-0.01, s) as Scalar) : s
}

export const leakyRectify = extend1(leakyRectifyScalar, 0)

export function leakyRelu(t: Tensor): (weight: Tensor, bias: Tensor) => Tensor {
  return (weight, bias) => leakyRectify(linear(t)(weight, bias))
}
