import { zeroTensor } from "./zeroTensor.js"
import assert from "node:assert"
import { test } from "node:test"

test("zeroTensor", () => {
  assert.deepStrictEqual(zeroTensor([2, 3]), [
    [0, 0, 0],
    [0, 0, 0],
  ])

  assert.deepStrictEqual(zeroTensor([3]), [0, 0, 0])

  assert.deepStrictEqual(zeroTensor([]), 0)
})
