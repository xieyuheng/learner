import { zip } from "../../utils/zip.js"
import type { Scalar } from "../tensor/index.js"
import { assertTensorArray, tensorReal, type Tensor } from "../tensor/index.js"
import type { Representation } from "./Representation.js"
import { gradient } from "./index.js"
import { revise } from "./revise.js"

export function gradientDescent<R>(representation: Representation<R>): (
  objective: (...ps: Array<Tensor>) => Scalar,
  ps: Array<Tensor>,
  options: {
    revs: number
  },
) => Array<Tensor> {
  return (objective, ps, options) => {
    function step(rs: Array<R>): Array<R> {
      const ps = rs.map(representation.deflate)
      const gs = gradient(objective, ps)
      assertTensorArray(gs)
      return zip(rs, gs).map(([r, g]) => representation.update(r, g))
    }

    const rs = revise(step, options.revs, ps.map(representation.inflate))
    const ns = tensorReal(rs.map(representation.deflate))
    assertTensorArray(ns)
    return ns
  }
}
