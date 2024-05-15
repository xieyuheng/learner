import { zip } from "../utils/zip.js"
import {
  assertTensorArray,
  gradient,
  tensorReal,
  type Scalar,
  type Tensor,
} from "./index.js"
import { mul, sub } from "./toys/index.js"

export type GradientDescentOptions = {
  revs: number
  learningRate: number
}

export function gradientDescent(
  objective: (...ps: Array<Tensor>) => Scalar,
  ps: Array<Tensor>,
  options: GradientDescentOptions,
): Array<Tensor> {
  const step = gradientDescentStep(objective, options)
  const rs = revise(step, options.revs, ps)
  const ns = tensorReal(rs)
  assertTensorArray(ns)
  return ns
}

export function gradientDescentStep(
  objective: (...ps: Array<Tensor>) => Scalar,
  options: GradientDescentOptions,
): (ps: Array<Tensor>) => Array<Tensor> {
  return function step(ps: Array<Tensor>): Array<Tensor> {
    const gs = gradient(objective, ps)
    assertTensorArray(gs)
    return zip(ps, gs).map(([p, g]) => sub(p, mul(options.learningRate, g)))
  }
}

export function revise<Parameters extends Tensor>(
  fn: (ps: Parameters) => Parameters,
  revs: number,
  ps: Parameters,
): Parameters {
  while (revs > 0) {
    ps = fn(ps)
    revs--
  }

  return ps
}
