import { test } from "node:test"
import { gradientDescent } from "./gradientDescent.js"
import { line } from "./line.js"
import { l2Loss } from "./loss.js"

test("gradientDescent -- line", () => {
  const lineXs = [2, 1, 4, 3]
  const lineYs = [1.8, 1.2, 4.2, 3.3]
  const objective = l2Loss(line)(lineXs, lineYs)
  console.log(gradientDescent(objective, [0, 0]))
})
