import { isScalar } from "./Scalar.js"
import { type Tensor } from "./Tensor.js"

export type Shape = Array<number>

export function shape(t: Tensor): Shape {
  const shape: Shape = []
  while (!isScalar(t)) {
    shape.push(t.length)
    t = t[0]
  }

  return shape
}
