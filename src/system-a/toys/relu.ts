import type { Scalar, Tensor } from "../tensor/index.js"
import { dot } from "./dot.js"
import { extend1 } from "./extend.js"
import { add, lt } from "./toys.js"

export function rectifyScalar(s: Scalar): Scalar {
  if (lt(s, 0)) {
    return 0
  } else {
    return s
  }
}

export const rectify = extend1(rectifyScalar, 0)

export function linear(t: Tensor): (weight: Tensor, bias: Tensor) => Tensor {
  return (weight, bias) => add(dot(weight, t), bias)
}
