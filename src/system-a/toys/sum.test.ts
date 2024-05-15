import assert from "node:assert"
import { test } from "node:test"
import { tensorReal } from "../Tensor.js"
import { sum } from "./sum.js"

test("sum", () => {
  assert.deepStrictEqual(tensorReal(sum([1, 2, 3])), 6)
})

test("sum -- extended", () => {
  assert.deepStrictEqual(
    tensorReal(
      sum([
        [1, 2, 3],
        [4, 5, 6],
      ]),
    ),
    [6, 15],
  )
})
