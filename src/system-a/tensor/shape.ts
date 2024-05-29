import { arrayEqual } from "../../utils/arrayEqual.js"
import { assertArrayTheSame } from "../../utils/assertArrayTheSame.js"
import { isScalar } from "./Scalar.js"
import { type Tensor } from "./Tensor.js"
import { assertTensorRankAbove1 } from "./assertions.js"

export type Shape = Array<number>

export function shape(t: Tensor): Shape {
  const shape: Shape = []
  while (!isScalar(t)) {
    shape.push(t.length)
    t = t[0]
  }

  return shape
}

export function shapeWittCheck(t: Tensor): Shape {
  if (isScalar(t)) return []

  assertTensorRankAbove1(t)
  assertArrayTheSame(t.map(shape), arrayEqual)
  return shape(t)
}
