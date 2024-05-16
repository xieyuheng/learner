import assert from "assert"
import { test } from "node:test"
import { tensorAlmostEqual, tensorReal } from "../Tensor.js"
import { gradientDescent } from "../gradientDescent.js"
import { l2Loss } from "../loss.js"
import { samplingObjective } from "../samplingObjective.js"
import { line } from "./line.js"

test("line", () => {
  assert.deepStrictEqual(tensorReal(line(1)(2, 3)), 5)
})

test("line -- extended", () => {
  assert.deepStrictEqual(tensorReal(line([1, 2])(2, 3)), [5, 7])
})

test("line -- gradientDescent", () => {
  const xs = [2, 1, 4, 3]
  const ys = [1.8, 1.2, 4.2, 3.3]

  const objective = l2Loss(line)(xs, ys)
  const rs = gradientDescent(objective, [0, 0], {
    revs: 1000,
    learningRate: 0.01,
  })

  assert(tensorAlmostEqual(rs, [1, 0], 10e-1))
  assert(tensorAlmostEqual(rs, [1.05, 0], 10e-6))
})

test("line -- gradientDescent + samplingObjective ", () => {
  const xs = [2, 1, 4, 3]
  const ys = [1.8, 1.2, 4.2, 3.3]

  const objective = samplingObjective(l2Loss(line), xs, ys, {
    batchSize: 4,
  })

  const rs = gradientDescent(objective, [0, 0], {
    revs: 1000,
    learningRate: 0.01,
  })

  assert(tensorAlmostEqual(rs, [1, 0], 10e-1))
})
