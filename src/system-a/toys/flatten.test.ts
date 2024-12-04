import assert from "node:assert"
import { test } from "node:test"
import { flatten } from "./flatten.ts"

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
