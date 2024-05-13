import assert from "node:assert"
import { test } from "node:test"
import { revise } from "./revise.js"

test("revise", () => {
  function fn(ps: Array<number>): Array<number> {
    return ps.map(p => p - 3)
  }

  assert.deepStrictEqual(revise(fn, 5, [1, 2, 3]), [-14, -13, -12])
})
