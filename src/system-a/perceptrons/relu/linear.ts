import type { Tensor } from "../../tensor/index.ts"
import { add, dot, extend2, mul, sum } from "../../toys/index.ts"

const mul21 = extend2(mul, 2, 1)

export function matrixVactorMul(m: Tensor, v: Tensor): Tensor {
  return sum(mul21(m, v))
}

// NOTE `linear` is not fully extended to all `Tensor`.

export function linear(t: Tensor): (weight: Tensor, bias: Tensor) => Tensor {
  return (weight, bias) => add(matrixVactorMul(weight, t), bias)
}

export function linearWrong(
  t: Tensor,
): (weight: Tensor, bias: Tensor) => Tensor {
  return (weight, bias) => add(dot(weight, t), bias)
}
