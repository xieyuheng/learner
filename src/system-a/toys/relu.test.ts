import assert from "node:assert"
import { test } from "node:test"
import { assertTensorAlmostEqual } from "../tensor/assertions.js"
import { linear, linearWrong, rectify, relu } from "./relu.js"

test("rectify", () => {
  assert.deepStrictEqual(
    rectify([
      [-1, -2, -3],
      [1, 2, 3],
    ]),
    [
      [0, 0, 0],
      [1, 2, 3],
    ],
  )
})

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

test("relu", () => {
  assertTensorAlmostEqual(
    relu([2, 1, 3])(
      [
        [7.1, 4.3, -6.4],
        [7.1, 4.3, -6.4],
      ],
      [0.6, 1],
    ),
    [0, 0.3],
    0.01,
  )

  assertTensorAlmostEqual(
    relu([2, 1, 3])(
      [
        [7.1, 4.3, -6.4],
        [7.1, 4.3, -6.4],
      ],
      [0.6, 0.6],
    ),
    [0, 0],
    0,
  )

  assertTensorAlmostEqual(
    relu([2, 1, 3])(
      [
        [7.1, 4.3, -6.4],
        [7.1, 4.3, -6.4],
      ],
      0.6,
    ),
    [0, 0],
    0,
  )
})
