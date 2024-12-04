import { arrayEqual } from "../../utils/arrayEqual.ts"
import { assertArrayTheSame } from "../../utils/assertArrayTheSame.ts"
import { isScalar } from "./Scalar.ts"
import { type Tensor } from "./Tensor.ts"
import { assertTensorArray } from "./assertions.ts"

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

  assertTensorArray(t)
  assertArrayTheSame(t.map(shape), arrayEqual)
  return shape(t)
}
