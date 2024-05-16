import { refs } from "../utils/refs.js"
import { samples } from "../utils/samples.js"
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
  assertTensorArray(ys)
  const size = xs.length
  return (...ps) => {
    const b = samples(size, options.batchSize)
    return expectant(refs(xs, b), refs(ys, b))(...ps)
  }
}
