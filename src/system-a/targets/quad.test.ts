import assert from "node:assert"
import { test } from "node:test"
import type { GradientDescentFn } from "../gradient-descent/gradientDescent.js"
import { gradientDescentLonely } from "../gradient-descent/gradientDescentLonely.js"
import { gradientDescentNaked } from "../gradient-descent/gradientDescentNaked.js"
import { l2Loss } from "../loss.js"
import { assertTensorAlmostEqual, tensorReal } from "../tensor/index.js"
import { samplingObjective } from "../tensor/samplingObjective.js"
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

function testGradientDescentByQuad(gradientDescentFn: GradientDescentFn) {
  const xs = [-1, 0, 1, 2, 3]
  const ys = [2.55, 2.1, 4.35, 10.2, 18.25]

  const objective = samplingObjective(l2Loss(quad), xs, ys, {
    batchSize: 4,
  })

  const rs = gradientDescentFn(objective, [0, 0, 0], {
    revs: 1000,
  })

  assertTensorAlmostEqual(rs, [1.478, 0.99, 2.05], 10e-2)
}

test("quad -- gradientDescentNaked", () => {
  testGradientDescentByQuad(gradientDescentNaked({ learningRate: 0.001 }))
})

test("quad -- gradientDescentLonely", () => {
  testGradientDescentByQuad(gradientDescentLonely({ learningRate: 0.001 }))
})
