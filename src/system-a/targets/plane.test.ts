import assert from "node:assert"
import { test } from "node:test"
import { gradientDescent } from "../gradient-descent/index.js"
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

test("plane -- gradientDescent", () => {
  const xs = [
    [1, 2.05],
    [1, 3],
    [2, 2],
    [2, 3.91],
    [3, 6.13],
    [4, 8.09],
  ]
  const ys = [13.99, 15.99, 18, 22.4, 30.2, 37.94]

  const objective = l2Loss(plane)(xs, ys)

  const rs = gradientDescent(objective, [[0, 0], 0], {
    revs: 1000,
    learningRate: 0.001,
  })

  assertTensorAlmostEqual(rs, [[3.98, 2.04], 5.78], 10e-3)

  assertTensorAlmostEqual(plane([2, 3.91])([3.98, 2.04], 5.78), 22.4, 1)
})

test("plane -- gradientDescent & samplingObjective", () => {
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

  const rs = gradientDescent(objective, [[0, 0], 0], {
    revs: 15000,
    learningRate: 0.001,
  })

  assertTensorAlmostEqual(rs, [[3.98, 2.04], 5.78], 0.5)
})
