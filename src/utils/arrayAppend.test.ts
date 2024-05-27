import assert from "node:assert"
import { test } from "node:test"
import { arrayAppend } from "./arrayAppend.js"

test("arrayAppend", () => {
  assert.deepStrictEqual(arrayAppend([[10], [3]]), [10, 3])
  assert.deepStrictEqual(
    arrayAppend([
      [1, 2, 3],
      [4, 5, 6],
    ]),
    [1, 2, 3, 4, 5, 6],
  )
  assert.deepStrictEqual(arrayAppend([[1, 2, 3], []]), [1, 2, 3])
  assert.deepStrictEqual(arrayAppend([[], [1, 2, 3]]), [1, 2, 3])
})
