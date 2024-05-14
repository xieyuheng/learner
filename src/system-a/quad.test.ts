import assert from "node:assert"
import { test } from "node:test"
import { tensorReal } from "./Tensor.js"
import { quad } from "./quad.js"

test("quad", () => {
  assert.deepStrictEqual(tensorReal(quad(3)(4.5, 2.1, 7.8)), 54.6)
})
