import type { Scalar, Tensor } from "../tensor/index.js"
import { add, dot, extend1, extend2, lt, mul, sum } from "../toys/index.js"

export function rectifyScalar(s: Scalar): Scalar {
  if (lt(s, 0)) {
    return 0
  } else {
    return s
  }
}

export const rectify = extend1(rectifyScalar, 0)

const mul21 = extend2(mul, 2, 1)

export function matrixVactorMul(m: Tensor, v: Tensor): Tensor {
  return sum(mul21(m, v))
}

export function linear(t: Tensor): (weight: Tensor, bias: Tensor) => Tensor {
  return (weight, bias) => add(matrixVactorMul(weight, t), bias)
}

export function linearWrong(
  t: Tensor,
): (weight: Tensor, bias: Tensor) => Tensor {
  return (weight, bias) => add(dot(weight, t), bias)
}

// NOTE The name relu is short for
// rectifying linear unit.

export function relu(t: Tensor): (weight: Tensor, bias: Tensor) => Tensor {
  return (weight, bias) => rectify(linear(t)(weight, bias))
}
