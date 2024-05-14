import { zip } from "../utils/zip.js"
import { assertTensor1, gradient, tensorReal, type Tensor } from "./index.js"
import { revise } from "./revise.js"
import { mul, sub } from "./toys/index.js"

const revs = 1000
const learningRate = 0.01

export function gradientDescent(
  objective: (...ps: Array<Tensor>) => number,
  ps: Array<Tensor>,
): Array<Tensor> {
  const step = gradientDescentStep(objective)
  const rs = revise(step, revs, ps)
  const ns = tensorReal(rs)
  assertTensor1(ns)
  return ns
}

export function gradientDescentStep(
  objective: (...ps: Array<Tensor>) => number,
): (ps: Array<Tensor>) => Array<Tensor> {
  return function step(ps: Array<Tensor>): Array<Tensor> {
    const gs = gradient(objective, ps)
    assertTensor1(gs)
    return zip(ps, gs).map(([p, g]) => sub(p, mul(learningRate, g)))
  }
}
