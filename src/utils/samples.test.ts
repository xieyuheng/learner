import assert from "node:assert"
import { test } from "node:test"
import { samples } from "./samples.js"

test("samples", () => {
  assert.deepStrictEqual(samples(10, 3).length, 3)
  assert.deepStrictEqual(samples(10, 100).length, 100)
})
