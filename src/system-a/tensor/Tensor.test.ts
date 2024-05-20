import assert from "node:assert"
import { test } from "node:test"
import { shape } from "./Tensor.js"

test("Tensor -- shape", () => {
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
