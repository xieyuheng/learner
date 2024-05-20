import { type Tensor } from "../Tensor.js"
import { dot } from "../toys/dot.js"
import { add } from "../toys/index.js"

export function plane(t: Tensor): (...ps: [Tensor, Tensor]) => Tensor {
  return (ps0, ps1) => add(dot(ps0, t), ps1)
}
