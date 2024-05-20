import assert from "node:assert"
import { test } from "node:test"
import { gradientDescentNaked } from "../gradient-descent/gradientDescentNaked.js"
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

test("plane -- gradientDescentNaked", () => {
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

  const rs = gradientDescentNaked({ learningRate: 0.001 })(
    objective,
    [[0, 0], 0],
    {
      revs: 15000,
    },
  )

  assertTensorAlmostEqual(rs, [[3.98, 2.04], 5.78], 0.5)
})
