import assert from "node:assert"
import { test } from "node:test"
import { tensorMap, Dual, endOfChain, scalarTruncate } from "./appendix-a.js"

test("appendix-a -- tensorMap", () => {
  assert.deepStrictEqual(
    tensorMap(
      (x) => (x as number) + 1,
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
    ),
    [
      [2, 3, 4],
      [5, 6, 7],
    ],
  )
})

test("appendix-a -- scalarTruncate", () => {
  assert.deepStrictEqual(
    tensorMap(
      scalarTruncate,
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
    ),
    [
      [Dual(1, endOfChain), Dual(2, endOfChain), Dual(3, endOfChain)],
      [Dual(4, endOfChain), Dual(5, endOfChain), Dual(6, endOfChain)],
    ],
  )

  assert.deepStrictEqual(
    tensorMap(
      scalarTruncate,
      [
        [Dual(1, endOfChain), Dual(2, endOfChain), Dual(3, endOfChain)],
        [Dual(4, endOfChain), Dual(5, endOfChain), Dual(6, endOfChain)],
      ],
    ),
    [
      [Dual(1, endOfChain), Dual(2, endOfChain), Dual(3, endOfChain)],
      [Dual(4, endOfChain), Dual(5, endOfChain), Dual(6, endOfChain)],
    ],
  )
})
