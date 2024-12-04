import type { Target } from "../loss/index.ts"
import type { Tensor } from "../tensor/Tensor.ts"

export type Model = (t: Tensor) => Tensor

export function model(
  target: Target,
  ps: Array<Tensor>,
): (t: Tensor) => Tensor {
  return (t) => target(t)(...ps)
}
