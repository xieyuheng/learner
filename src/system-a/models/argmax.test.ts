import { argmax } from "./argmax.js"
import assert from "node:assert"
import { test } from "node:test"

test("argmax", () => {
  assert.deepStrictEqual(argmax([1, 2, 3]), 2)
  assert.deepStrictEqual(argmax([3, 2, 1]), 0)
  assert.deepStrictEqual(argmax([1, 3, 2]), 1)
})
