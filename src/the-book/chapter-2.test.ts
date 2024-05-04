import assert from "node:assert"
import { test } from "node:test"
import { shape } from "./chapter-2.js"

test("ch2 -- shape", () => {
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
