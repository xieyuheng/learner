import type { Target } from "../loss.js"
import type { Tensor } from "../tensor/Tensor.js"

export function model(
  target: Target,
  ps: Array<Tensor>,
): (t: Tensor) => Tensor {
  return (t) => target(t)(ps)
}
