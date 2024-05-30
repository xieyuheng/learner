import type { Scalar } from "../tensor/Scalar.js"
import { extend2 } from "../toys/extend.js"
import { argmax } from "./argmax.js"

export type Classification = Array<Scalar>

export function compareClassification1(
  xs: Classification,
  ys: Classification,
): number {
  return argmax(xs) === argmax(ys) ? 1 : 0
}

export const compareClassification = extend2(compareClassification1, 1, 1)
