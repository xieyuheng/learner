import assert from "node:assert"
import { test } from "node:test"
import { l2Loss } from "./chapter-3.js"
import { line } from "./interlude-i.js"

test("chapter-3 -- l2Loss", () => {
  const lineXs = [2, 1, 4, 3]
  const lineYs = [1.8, 1.2, 4.2, 3.3]
  assert.deepStrictEqual(l2Loss(line)(lineXs, lineYs)([0, 0]), 33.21)
})
