import { type Tensor } from "../tensor/index.js"
import { extend1 } from "./extend.js"

export function flatten2(t: Array<Array<Tensor>>): Array<Tensor> {
  return t.flatMap((x) => x)
}

export const flatten = extend1(flatten2, 2)
