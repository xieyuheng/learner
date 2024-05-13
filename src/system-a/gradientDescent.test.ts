import assert from "assert"
import { test } from "node:test"
import { tensorAlmostEqual } from "./Tensor.js"
import { gradientDescent } from "./gradientDescent.js"
import { line } from "./line.js"
import { l2Loss } from "./loss.js"

test("gradientDescent -- line", () => {
  const lineXs = [2, 1, 4, 3]
  const lineYs = [1.8, 1.2, 4.2, 3.3]
  const objective = l2Loss(line)(lineXs, lineYs)
  const rs = gradientDescent(objective, [0, 0])

  assert(tensorAlmostEqual(rs, [1, 0], 10e-1))
  assert(tensorAlmostEqual(rs, [1.05, 0], 10e-6))
})
