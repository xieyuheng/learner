import { assertTensorArray, type Tensor } from "./Tensor.js"
import type { Expectant, Objective } from "./loss.js"

export function samplingObjective(
  expectant: Expectant,
  xs: Tensor,
  ys: Tensor,
  options: {
    batchSize: number
  },
): Objective {
  assertTensorArray(xs)
  const size = xs.length
  return (...ps) => {
    throw new Error()
  }
}
