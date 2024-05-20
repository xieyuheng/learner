import { zip } from "../../utils/zip.js"
import type { Scalar } from "../tensor/index.js"
import { assertTensorArray, tensorReal, type Tensor } from "../tensor/index.js"
import { mul, sub } from "../toys/index.js"
import type { Representation } from "./Representation.js"
import { gradient } from "./index.js"

export function gradientDescentGeneral<R>(
  representation: Representation<R>,
  objective: (...ps: Array<Tensor>) => Scalar,
  ps: Array<Tensor>,
  options: {
    revs: number
  },
): Array<Tensor> {
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

export function gradientDescent(
  objective: (...ps: Array<Tensor>) => Scalar,
  ps: Array<Tensor>,
  options: {
    revs: number
    learningRate: number
  },
): Array<Tensor> {
  function step(ps: Array<Tensor>): Array<Tensor> {
    const gs = gradient(objective, ps)
    assertTensorArray(gs)
    return zip(ps, gs).map(([p, g]) => sub(p, mul(options.learningRate, g)))
  }

  const rs = revise(step, options.revs, ps)
  const ns = tensorReal(rs)
  assertTensorArray(ns)
  return ns
}

export function revise<T>(step: (target: T) => T, revs: number, target: T): T {
  while (revs > 0) {
    target = step(target)
    revs--
  }

  return target
}
