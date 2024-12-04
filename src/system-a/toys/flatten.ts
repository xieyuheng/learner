import { type Tensor } from "../tensor/index.ts"
import { extend1 } from "./extend.ts"

export function flatten2(t: Array<Array<Tensor>>): Array<Tensor> {
  return t.flatMap((x) => x)
}

export const flatten = extend1(flatten2, 2)
