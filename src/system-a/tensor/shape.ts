import { isScalar } from "./Scalar.js"
import { type Tensor } from "./Tensor.js"

export function shape(t: Tensor): Array<number> {
  const result: Array<number> = []
  while (!isScalar(t)) {
    result.push(t.length)
    t = t[0]
  }

  return result
}
