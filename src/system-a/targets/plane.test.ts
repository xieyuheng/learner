import assert from "node:assert"
import { test } from "node:test"
import { gradientDescentLonely } from "../gradient-descent/gradientDescentLonely.js"
import { gradientDescentNaked } from "../gradient-descent/gradientDescentNaked.js"
import { gradientDescentVelocity } from "../gradient-descent/gradientDescentVelocity.js"
import type { GradientDescentFn } from "../gradient-descent/index.js"
import { l2Loss } from "../loss.js"
import { assertTensorAlmostEqual, tensorReal } from "../tensor/index.js"
import { samplingObjective } from "../tensor/samplingObjective.js"
import { plane } from "./plane.js"

test("plane", () => {
  assert.deepStrictEqual(tensorReal(plane([1, 3])([1, 2], 3)), 10)
})

test("plane -- extended", () => {
  assert.deepStrictEqual(
    tensorReal(
      plane([
        [1, 3],
        [2, 4],
      ])([1, 2], 3),
    ),
    [10, 13],
  )
})

function testGradientDescentByLine(
  gradientDescentFn: GradientDescentFn,
  options: {
    revs: number
  },
) {
  const xs = [
    [1, 2.05],
    [1, 3],
    [2, 2],
    [2, 3.91],
    [3, 6.13],
    [4, 8.09],
  ]
  const ys = [13.99, 15.99, 18, 22.4, 30.2, 37.94]

  const objective = samplingObjective(l2Loss(plane), xs, ys, {
    batchSize: 4,
  })

  const rs = gradientDescentFn(objective, [[0, 0], 0], {
    revs: options.revs,
  })

  assertTensorAlmostEqual(rs, [[3.98, 2.04], 5.78], 0.5)
}

test("plane -- gradientDescentNaked", () => {
  testGradientDescentByLine(gradientDescentNaked({ learningRate: 0.001 }), {
    revs: 15000,
  })
})

test("plane -- gradientDescentLonely", () => {
  testGradientDescentByLine(gradientDescentLonely({ learningRate: 0.001 }), {
    revs: 15000,
  })
})

test("plane -- gradientDescentVelocity", () => {
  testGradientDescentByLine(
    gradientDescentVelocity({ learningRate: 0.001, relayFactor: 0.9 }),
    { revs: 5000 },
  )
})
