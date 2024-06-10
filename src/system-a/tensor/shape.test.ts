import { shape } from "./shape.js"
import assert from "node:assert"
import { test } from "node:test"

test("shape", () => {
  assert.deepStrictEqual(shape(1), [])
  assert.deepStrictEqual(shape([1]), [1])
  assert.deepStrictEqual(shape([1, 2, 3]), [3])
  assert.deepStrictEqual(
    shape([
      [1, 2, 3],
      [1, 2, 3],
    ]),
    [2, 3],
  )
  assert.deepStrictEqual(
    shape([
      [[1], [2], [3]],
      [[1], [2], [3]],
    ]),
    [2, 3, 1],
  )
})
