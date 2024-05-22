import type { Scalar } from "../tensor/index.js"
import { extend1 } from "./extend.js"
import { addScalar } from "./index.js"

export function sum1(xs: Array<Scalar>): Scalar {
  return xs.reduce((x, result) => addScalar(x, result), 0)
}

export const sum = extend1(sum1, 1)
