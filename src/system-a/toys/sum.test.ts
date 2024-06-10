import { sum } from "./sum.js"
import assert from "node:assert"
import { test } from "node:test"

test("sum", () => {
  assert.deepStrictEqual(sum([1, 2, 3]), 6)
})

test("sum -- extended", () => {
  assert.deepStrictEqual(
    sum([
      [1, 2, 3],
      [4, 5, 6],
    ]),
    [6, 15],
  )
})
