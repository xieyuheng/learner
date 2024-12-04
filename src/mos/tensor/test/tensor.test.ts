import assert from "node:assert"
import test from "node:test"
import { rank, shape } from "../tensor.ts"

test("mos -- shape", () => {
  assert.deepEqual(shape(1), [])
  assert.deepEqual(shape([1, 2, 3]), [3])
  assert.deepEqual(shape([[1], [2], [3]]), [3, 1])
})

test("mos -- rank", () => {
  assert.deepEqual(rank(1), 0)
  assert.deepEqual(rank([1]), 1)
  assert.deepEqual(rank([[1], [2], [3]]), 2)
})
