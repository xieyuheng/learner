import assert from "node:assert"
import { test } from "node:test"
import { line } from "./chapter-1.js"

test("ch1 -- line", () => {
  assert.deepStrictEqual(line(1)([2, 3]), 2 * 1 + 3)
})
