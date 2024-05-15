import { zip } from "../utils/zip.js"
import {
  assertTensor1,
  gradient,
  tensorReal,
  type Scalar,
  type Tensor,
} from "./index.js"
import { revise } from "./revise.js"
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
  assertTensor1(ns)
  return ns
}

export function gradientDescentStep(
  objective: (...ps: Array<Tensor>) => Scalar,
  options: GradientDescentOptions,
): (ps: Array<Tensor>) => Array<Tensor> {
  return function step(ps: Array<Tensor>): Array<Tensor> {
    const gs = gradient(objective, ps)
    assertTensor1(gs)
    return zip(ps, gs).map(([p, g]) => sub(p, mul(options.learningRate, g)))
  }
}
