import assert from "assert"
import { test } from "node:test"
import type { GradientDescentFn } from "../gradient-descent/gradientDescent.js"
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

function testGradientDescentByLine(gradientDescentFn: GradientDescentFn) {
  const xs = [2, 1, 4, 3]
  const ys = [1.8, 1.2, 4.2, 3.3]

  const objective = samplingObjective(l2Loss(line), xs, ys, {
    batchSize: 4,
  })

  const rs = gradientDescentFn(objective, [0, 0], {
    revs: 1000,
  })

  assertTensorAlmostEqual(rs, [1, 0], 10e-1)
}

test("line -- gradientDescentNaked", () => {
  testGradientDescentByLine(gradientDescentNaked({ learningRate: 0.01 }))
})
