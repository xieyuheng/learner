import type {
  Scalar,
  Tensor,
  TensorRankAbove1,
  TensorRankAbove2,
} from "../tensor/index.js"
import { dot } from "./dot.js"
import { extend1, extend2 } from "./extend.js"
import { sum } from "./sum.js"
import { add, lt, mul } from "./toys.js"

export function rectifyScalar(s: Scalar): Scalar {
  if (lt(s, 0)) {
    return 0
  } else {
    return s
  }
}

export const rectify = extend1(rectifyScalar, 0)
export const matrixVactorMul = extend2(mul, 2, 1)

export function linear(
  t: TensorRankAbove1,
): (weight: TensorRankAbove2, bias: Tensor) => Tensor {
  return (weight, bias) => add(sum(matrixVactorMul(weight, t)), bias)
}

export function linearWrong(
  t: TensorRankAbove1,
): (weight: TensorRankAbove2, bias: Tensor) => Tensor {
  return (weight, bias) => add(dot(weight, t), bias)
}

// NOTE The name relu is short for
// rectifying linear unit.

export function relu(
  t: TensorRankAbove1,
): (weight: TensorRankAbove2, bias: Tensor) => Tensor {
  return (weight, bias) => rectify(linear(t)(weight, bias))
}
