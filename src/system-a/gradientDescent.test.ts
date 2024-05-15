import assert from "assert"
import { test } from "node:test"
import { tensorAlmostEqual } from "./Tensor.js"
import { gradientDescent } from "./gradientDescent.js"
import { line } from "./line.js"
import { l2Loss } from "./loss.js"
import { quad } from "./quad.js"

test("gradientDescent -- line", () => {
  const lineXs = [2, 1, 4, 3]
  const lineYs = [1.8, 1.2, 4.2, 3.3]
  const objective = l2Loss(line)(lineXs, lineYs)
  const rs = gradientDescent(objective, [0, 0], {
    revs: 1000,
    learningRate: 0.01,
  })

  assert(tensorAlmostEqual(rs, [1, 0], 10e-1))
  assert(tensorAlmostEqual(rs, [1.05, 0], 10e-6))
})

test("gradientDescent -- quad", () => {
  const quadXs = [-1, 0, 1, 2, 3]
  const quadYs = [2.55, 2.1, 4.35, 10.2, 18.25]
  const objective = l2Loss(quad)(quadXs, quadYs)
  const rs = gradientDescent(objective, [0, 0, 0], {
    revs: 1000,
    learningRate: 0.001,
  })

  console.log(rs)
})
