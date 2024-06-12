import assert from "node:assert"
import { test } from "node:test"
import {
  Dual,
  addScalar,
  endOfChain,
  gradient,
  mulScalar,
  scalarTruncate,
  tensorMap,
} from "./appendix-a.js"

test("appendix-a -- tensorMap", () => {
  assert.deepStrictEqual(
    tensorMap(
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
      (x) => (x as number) + 1,
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
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
      scalarTruncate,
    ),
    [
      [Dual(1, endOfChain), Dual(2, endOfChain), Dual(3, endOfChain)],
      [Dual(4, endOfChain), Dual(5, endOfChain), Dual(6, endOfChain)],
    ],
  )

  assert.deepStrictEqual(
    tensorMap(
      [
        [Dual(1, endOfChain), Dual(2, endOfChain), Dual(3, endOfChain)],
        [Dual(4, endOfChain), Dual(5, endOfChain), Dual(6, endOfChain)],
      ],
      scalarTruncate,
    ),
    [
      [Dual(1, endOfChain), Dual(2, endOfChain), Dual(3, endOfChain)],
      [Dual(4, endOfChain), Dual(5, endOfChain), Dual(6, endOfChain)],
    ],
  )
})

test("appendix-a -- gradient", () => {
  assert.deepStrictEqual(gradient(addScalar, [1, 1]), [1, 1])
  assert.deepStrictEqual(gradient(addScalar, [2, 3]), [1, 1])

  assert.deepStrictEqual(gradient(mulScalar, [1, 1]), [1, 1])
  assert.deepStrictEqual(gradient(mulScalar, [2, 3]), [3, 2])
})
