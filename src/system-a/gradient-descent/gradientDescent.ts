import { zip } from "../../utils/zip.ts"
import { gradient } from "../gradient/index.ts"
import { assertTensorArray, type Tensor } from "../tensor/index.ts"
import type { Representation } from "./Representation.ts"

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
    let revs = options.revs
    let rs = ps.map(representation.inflate)

    function step(rs: Array<R>): Array<R> {
      const ps = rs.map(representation.deflate)
      const gs = gradient(objective, ps)
      assertTensorArray(gs)
      return zip(rs, gs).map(([r, g]) => representation.update(r, g))
    }

    while (revs > 0) {
      rs = step(rs)
      revs--
    }

    return rs.map(representation.deflate)
  }
}
