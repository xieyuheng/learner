import type { Tensor } from "../tensor/index.ts"
import { add, mul } from "../toys/index.ts"

export function smooth(decayRate: number, average: Tensor, g: Tensor): Tensor {
  return add(mul(decayRate, average), mul(1 - decayRate, g))
}
