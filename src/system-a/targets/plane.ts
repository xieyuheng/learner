import { type Tensor } from "../tensor/index.js"
import { add, dot } from "../toys/index.js"

export function plane(t: Tensor): (...ps: [Tensor, Tensor]) => Tensor {
  return (ps0, ps1) => add(dot(ps0, t), ps1)
}
