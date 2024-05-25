import assert from "node:assert"
import { test } from "node:test"
import { rectify } from "./rectify.js"

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
