import assert from "node:assert"
import { test } from "node:test"
import { tensorReal } from "../Tensor.js"
import { plane } from "./plane.js"

test("plane", () => {
  assert.deepStrictEqual(tensorReal(plane([1, 3])([1, 2], 3)), 10)
})

test("plane -- extended", () => {
  assert.deepStrictEqual(
    tensorReal(
      plane([
        [1, 3],
        [2, 4],
      ])([1, 2], 3),
    ),
    [10, 13],
  )
})
