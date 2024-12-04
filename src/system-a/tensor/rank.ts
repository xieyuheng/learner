import { type Tensor } from "./Tensor.ts"
import { shape } from "./shape.ts"

export function rank(t: Tensor): number {
  return shape(t).length
}
