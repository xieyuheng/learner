import assert from "node:assert"
import { test } from "node:test"
import { line } from "../line.ts"

test("mos -- line", () => {
  assert.deepEqual(line(1)([2, 3]), 5)
})
