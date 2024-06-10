import { type Tensor } from "./Tensor.js"
import { shape } from "./shape.js"

export function rank(t: Tensor): number {
  return shape(t).length
}
