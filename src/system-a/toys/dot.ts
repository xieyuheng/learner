import { type Tensor } from "../tensor/index.ts"
import { mul, sum } from "./index.ts"

export function dot(w: Tensor, x: Tensor): Tensor {
  return sum(mul(w, x))
}
