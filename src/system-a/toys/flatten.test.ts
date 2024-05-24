import assert from "node:assert"
import { test } from "node:test"
import { flatten } from "./flatten.js"

test("flatten", () => {
  assert.deepStrictEqual(
    flatten([
      [1, 2, 3],
      [1, 2, 3],
    ]),
    [1, 2, 3, 1, 2, 3],
  )
})

test("flatten -- extended", () => {
  assert.deepStrictEqual(
    flatten([
      [
        [1, 2, 3],
        [1, 2, 3],
      ],
      [
        [1, 2, 3],
        [1, 2, 3],
      ],
    ]),
    [
      [1, 2, 3, 1, 2, 3],
      [1, 2, 3, 1, 2, 3],
    ],
  )
})
