import assert from "node:assert"
import { test } from "node:test"
import { add } from "./interlude-i.js"

test("interlude-i -- add", () => {
  assert.deepStrictEqual(add(1, 1), 2)
  assert.deepStrictEqual(add([2], [7]), [9])
})
