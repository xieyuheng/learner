import { type Tensor } from "../index.js"
import { mul, sum } from "./index.js"

export function dot(w: Array<Tensor>, x: Array<Tensor>): Tensor {
  return sum(mul(w, x))
}
