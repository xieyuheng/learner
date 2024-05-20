import assert from "assert"
import { test } from "node:test"
import { gradientDescentNaked } from "../gradient-descent/gradientDescentNaked.js"
import { l2Loss } from "../loss.js"
import { assertTensorAlmostEqual, tensorReal } from "../tensor/index.js"
import { samplingObjective } from "../tensor/samplingObjective.js"
import { line } from "./line.js"

test("line", () => {
  assert.deepStrictEqual(tensorReal(line(1)(2, 3)), 5)
})

test("line -- extended", () => {
  assert.deepStrictEqual(tensorReal(line([1, 2])(2, 3)), [5, 7])
})

test("line -- gradientDescentNaked", () => {
  const xs = [2, 1, 4, 3]
  const ys = [1.8, 1.2, 4.2, 3.3]

  const objective = l2Loss(line)(xs, ys)

  const rs = gradientDescentNaked({ learningRate: 0.01 })(objective, [0, 0], {
    revs: 1000,
  })

  assertTensorAlmostEqual(rs, [1, 0], 10e-1)
  assertTensorAlmostEqual(rs, [1.05, 0], 10e-6)
})

test("line -- gradientDescentNaked & samplingObjective ", () => {
  const xs = [2, 1, 4, 3]
  const ys = [1.8, 1.2, 4.2, 3.3]

  const objective = samplingObjective(l2Loss(line), xs, ys, {
    batchSize: 4,
  })

  const rs = gradientDescentNaked({ learningRate: 0.01 })(objective, [0, 0], {
    revs: 1000,
  })

  assertTensorAlmostEqual(rs, [1, 0], 10e-1)
})
