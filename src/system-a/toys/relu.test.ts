import assert from "node:assert"
import { test } from "node:test"
import { rectify } from "./relu.js"

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
