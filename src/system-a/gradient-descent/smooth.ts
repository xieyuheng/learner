import type { Tensor } from "../tensor/index.js"
import { add, mul } from "../toys/index.js"

export function smooth(decayRate: number, average: Tensor, g: Tensor): Tensor {
  return add(mul(decayRate, average), mul(1 - decayRate, g))
}
