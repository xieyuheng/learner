import assert from "node:assert"
import { test } from "node:test"
import { add } from "./interlude-i.js"

test("interlude-i -- add", () => {
  assert.deepStrictEqual(add(1, 1), 2)
  assert.deepStrictEqual(add([2], [7]), [9])
  assert.deepStrictEqual(add([5, 6, 7], [2, 0, 1]), [7, 6, 8])
  assert.deepStrictEqual(
    add(
      [
        [4, 6, 7],
        [2, 0, 1],
      ],
      [
        [1, 2, 2],
        [6, 3, 1],
      ],
    ),
    [
      [5, 8, 9],
      [8, 3, 2],
    ],
  )
  assert.deepStrictEqual(add(4, [3, 6, 5]), [7, 10, 9])
  assert.deepStrictEqual(add([3, 6, 5], 4), [7, 10, 9])
  assert.deepStrictEqual(
    add(
      [6, 9, 1],
      [
        [4, 3, 8],
        [7, 4, 7],
      ],
    ),
    [
      [10, 12, 9],
      [13, 13, 8],
    ],
  )
})
