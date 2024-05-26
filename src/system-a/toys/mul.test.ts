import assert from "node:assert"
import { test } from "node:test"
import { mul } from "./index.js"

// NOTE Related issues about `ext2`:
// https://github.com/themetaschemer/malt/issues/56

test("mul -- extended", () => {
  assert.deepStrictEqual(
    mul(
      [
        [1, 2],
        [3, 4],
      ],
      [5, 6],
    ),
    [
      [5, 12],
      [15, 24],
    ],
  )

  assert.deepStrictEqual(
    mul(
      [
        [3, 4, 5],
        [7, 8, 9],
      ],
      [2, 4, 3],
    ),
    [
      [6, 16, 15],
      [14, 32, 27],
    ],
  )
})
