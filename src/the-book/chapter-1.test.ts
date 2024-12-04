import assert from "node:assert"
import { test } from "node:test"
import { line } from "./chapter-1.ts"

test("chapter-1 -- line", () => {
  assert.deepStrictEqual(line(1)([2, 3]), 5)
})
