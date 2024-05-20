import { shape } from "./shape.js"
import { type Tensor } from "./Tensor.js"

export function rank(t: Tensor): number {
  return shape(t).length
}
