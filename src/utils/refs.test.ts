import assert from "node:assert"
import { test } from "node:test"
import { refs } from "./refs.js"

test("refs", () => {
  assert.deepStrictEqual(refs([0, 1, 2, 3, 4, 5], [1, 3, 5]), [1, 3, 5])
  assert.deepStrictEqual(refs([[0], [1], [2], [3], [4], [5]], [1, 3, 5]), [
    [1],
    [3],
    [5],
  ])
})
