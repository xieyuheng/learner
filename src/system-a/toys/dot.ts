import { type Tensor } from "../Tensor.js"
import { mul, sum } from "./index.js"

export function dot(w: Tensor, x: Tensor): Tensor {
  return sum(mul(w, x))
}
