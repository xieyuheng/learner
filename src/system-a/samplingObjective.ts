import { refs } from "../utils/refs.js"
import { samples } from "../utils/samples.js"
import { type Tensor } from "./Tensor.js"
import type { Expectant, Objective } from "./loss.js"

export function samplingObjective(
  expectant: Expectant,
  xs: Array<Tensor>,
  ys: Array<Tensor>,
  options: {
    batchSize: number
  },
): Objective {
  const size = xs.length
  return (...ps) => {
    const b = samples(size, options.batchSize)
    return expectant(refs(xs, b), refs(ys, b))(...ps)
  }
}
