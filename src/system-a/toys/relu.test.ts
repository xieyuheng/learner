import assert from "node:assert"
import { test } from "node:test"
import { rectify, relu } from "./relu.js"

test("relu -- rectify", () => {
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

test("relu", () => {
  assert.deepStrictEqual(relu([2, 1, 3])([7.1, 4.3, -6.4], 0.6), 0)
})
