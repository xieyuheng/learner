import assert from "node:assert"
import { test } from "node:test"
import { assertTensorAlmostEqual, tensorReal } from "../Tensor.js"
import { gradientDescent } from "../gradientDescent.js"
import { l2Loss } from "../loss.js"
import { samplingObjective } from "../samplingObjective.js"
import { quad } from "./quad.js"

test("quad", () => {
  assert.deepStrictEqual(tensorReal(quad(3)(4.5, 2.1, 7.8)), 54.6)
})

test("quad -- extended", () => {
  assert.deepStrictEqual(
    tensorReal(quad([1, 2, 3])(4.5, 2.1, 7.8)),
    [14.4, 30, 54.6],
  )
})

test("quad -- gradientDescent", () => {
  const xs = [-1, 0, 1, 2, 3]
  const ys = [2.55, 2.1, 4.35, 10.2, 18.25]

  const objective = l2Loss(quad)(xs, ys)

  const rs = gradientDescent(objective, [0, 0, 0], {
    revs: 1000,
    learningRate: 0.001,
  })

  assertTensorAlmostEqual(rs, [1.478, 0.99, 2.05], 10e-3)
})

test("quad -- gradientDescent & samplingObjective", () => {
  const xs = [-1, 0, 1, 2, 3]
  const ys = [2.55, 2.1, 4.35, 10.2, 18.25]

  const objective = samplingObjective(l2Loss(quad), xs, ys, {
    batchSize: 4,
  })

  const rs = gradientDescent(objective, [0, 0, 0], {
    revs: 1000,
    learningRate: 0.001,
  })

  assertTensorAlmostEqual(rs, [1.478, 0.99, 2.05], 10e-2)
})
