import assert from "node:assert"
import { test } from "node:test"
import { tensorReal } from "../tensor/index.js"
import { extend2 } from "./extend.js"
import { mul } from "./toys.js"

test("extend2 -- mul 0 0", () => {
  assert.deepStrictEqual(
    tensorReal(
      mul(
        [
          [8, 1],
          [7, 3],
          [5, 4],
        ],
        [
          [6, 2],
          [4, 9],
          [3, 8],
        ],
      ),
    ),
    [
      [48, 2],
      [28, 27],
      [15, 32],
    ],
  )
})

test("extend2 -- mul 2 1", () => {
  const mul21 = extend2(mul, 2, 1)

  assert.deepStrictEqual(
    tensorReal(
      mul21(
        [
          [8, 1],
          [7, 3],
          [5, 4],
        ],
        [
          [6, 2],
          [4, 9],
          [3, 8],
        ],
      ),
    ),
    [
      [
        [48, 2],
        [42, 6],
        [30, 8],
      ],
      [
        [32, 9],
        [28, 27],
        [20, 36],
      ],
      [
        [24, 8],
        [21, 24],
        [15, 32],
      ],
    ],
  )
})
