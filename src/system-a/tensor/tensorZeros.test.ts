import assert from "node:assert"
import { test } from "node:test"
import { tensorZeros } from "./tensorZeros.js"

test("tensorZeros", () => {
  assert.deepStrictEqual(
    tensorZeros([
      [1, 2, 3],
      [1, 2, 3],
    ]),
    [
      [0, 0, 0],
      [0, 0, 0],
    ],
  )
})
