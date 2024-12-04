import assert from "node:assert"
import { test } from "node:test"
import { linear, linearWrong } from "./linear.ts"

test("linear -- matrixVactorMul is necessary", () => {
  assert.deepStrictEqual(
    linear([1, 2, 3])(
      [
        [1, 1, 9],
        [3, 1, 5],
      ],
      [1, 2],
    ),
    [31, 22],
  )

  assert.deepStrictEqual(
    linear([4, 5, 6])(
      [
        [1, 1, 9],
        [3, 1, 5],
      ],
      [1, 2],
    ),
    [64, 49],
  )

  assert.deepStrictEqual(
    linear([
      [1, 2, 3],
      [4, 5, 6],
    ])(
      [
        [1, 1, 9],
        [3, 1, 5],
      ],
      [1, 2],
    ),
    [
      [31, 22],
      [64, 49],
    ],
  )

  assert.deepStrictEqual(
    linearWrong([
      [1, 2, 3],
      [4, 5, 6],
    ])(
      [
        [1, 1, 9],
        [3, 1, 5],
      ],
      [1, 2],
    ),
    [31, 49],
  )
})
