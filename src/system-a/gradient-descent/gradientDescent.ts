import { zip } from "../../utils/zip.js"
import { assertTensorRankAbove1, type Tensor } from "../tensor/index.js"
import type { Representation } from "./Representation.js"
import { gradient } from "./index.js"
import { revise } from "./revise.js"

export type GradientDescentFn = (
  objective: (...ps: Array<Tensor>) => Tensor,
  ps: Array<Tensor>,
  options: {
    revs: number
  },
) => Array<Tensor>

export function gradientDescent<R>(
  representation: Representation<R>,
): GradientDescentFn {
  return (objective, ps, options) => {
    function step(rs: Array<R>): Array<R> {
      const ps = rs.map(representation.deflate)
      const gs = gradient(objective, ps)
      assertTensorRankAbove1(gs)
      return zip(rs, gs).map(([r, g]) => representation.update(r, g))
    }

    const rs = revise(step, options.revs, ps.map(representation.inflate))
    const ns = rs.map(representation.deflate)
    assertTensorRankAbove1(ns)
    return ns
  }
}
