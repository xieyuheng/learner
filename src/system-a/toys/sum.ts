import type { Scalar } from "../tensor/index.ts"
import { extend1 } from "./extend.ts"
import { addScalar } from "./index.ts"

export function sum1(xs: Array<Scalar>): Scalar {
  return xs.reduce((x, result) => addScalar(x, result), 0)
}

export const sum = extend1(sum1, 1)
