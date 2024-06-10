import { shape } from "../tensor/index.js"
import { extend2 } from "./extend.js"
import { mul } from "./toys.js"
import assert from "node:assert"
import { test } from "node:test"

test("extend2 -- mul 0 0", () => {
  assert.deepStrictEqual(
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

test("extend2 -- mul 2 1 -- shape", () => {
  const mul21 = extend2(mul, 2, 1)

  assert.deepStrictEqual(
    // [3, 2], [3, 2] -> [3, 3, 2]
    [3, 3, 2],
    shape(
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
  )

  assert.deepStrictEqual(
    // [2, 3, 2], [2, 2] -> [2, 2, 3, 2]
    [2, 2, 3, 2],
    shape(
      mul21(
        [
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
        ],
        [
          [4, 9],
          [3, 8],
        ],
      ),
    ),
  )

  assert.deepStrictEqual(
    // [2, 3, 2], [3, 2] -> [2, 3, 3, 2]
    [2, 3, 3, 2],
    shape(
      mul21(
        [
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
        ],
        [
          [6, 2],
          [4, 9],
          [3, 8],
        ],
      ),
    ),
  )

  assert.deepStrictEqual(
    // [2, 3, 2], [1, 2] -> [2, 1, 3, 2]
    [2, 1, 3, 2],
    shape(
      mul21(
        [
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
        ],
        [[6, 2]],
      ),
    ),
  )
})
