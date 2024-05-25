import type { Tensor } from "../tensor/index.js"
import { dot } from "./dot.js"
import { add } from "./toys.js"

export function linear(t: Tensor): (weight: Tensor, bias: Tensor) => Tensor {
  return (weight, bias) => add(dot(weight, t), bias)
}
