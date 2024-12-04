import { refs } from "../../utils/refs.ts"
import { samples } from "../../utils/samples.ts"
import type { Expectant, Objective } from "../loss/index.ts"
import { type Tensor } from "../tensor/index.ts"

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
