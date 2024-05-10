import assert from "node:assert"
import { test } from "node:test"
import { add, gradient, mul } from "./index.js"

test("gradient", () => {
  assert.deepStrictEqual(gradient(add, [1, 1]), [1, 1])
  assert.deepStrictEqual(gradient(add, [[1], [1]]), [[1], [1]])
  assert.deepStrictEqual(gradient(add, [2, 3]), [1, 1])

  assert.deepStrictEqual(gradient(mul, [1, 1]), [1, 1])
  assert.deepStrictEqual(gradient(mul, [2, 3]), [3, 2])
  assert.deepStrictEqual(gradient(mul, [[2], [3]]), [[3], [2]])
})
