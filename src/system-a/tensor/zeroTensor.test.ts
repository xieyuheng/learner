import assert from "node:assert"
import { test } from "node:test"
import { zeroTensor } from "./zeroTensor.js"

test("tensorZeros", () => {
  assert.deepStrictEqual(zeroTensor([2, 3]), [
    [0, 0, 0],
    [0, 0, 0],
  ])

  assert.deepStrictEqual(zeroTensor([3]), [0, 0, 0])

  assert.deepStrictEqual(zeroTensor([]), 0)
})
