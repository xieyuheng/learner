import { zip } from "../../utils/zip.js"
import type { Scalar } from "../Scalar.js"
import { assertTensorArray, tensorReal, type Tensor } from "../Tensor.js"
import { mul, sub } from "../toys/index.js"
import { gradient } from "./index.js"

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
