import { type Tensor } from "../tensor/index.ts"
import { add, dot } from "../toys/index.ts"

export function plane(t: Tensor): (...ps: [Tensor, Tensor]) => Tensor {
  return (ps0, ps1) => add(dot(ps0, t), ps1)
}
