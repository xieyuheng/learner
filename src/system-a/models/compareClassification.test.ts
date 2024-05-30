import assert from "node:assert"
import { test } from "node:test"
import { compareClassification } from "./compareClassification.js"

test("compareClassification", () => {
  assert.deepStrictEqual(compareClassification([1, 2, 3], [10, 20, 30]), 1)
  assert.deepStrictEqual(compareClassification([3, 2, 1], [10, 20, 30]), 0)

  assert.deepStrictEqual(
    compareClassification(
      [
        [1, 2, 3],
        [3, 2, 1],
      ],
      [
        [10, 20, 30],
        [10, 20, 30],
      ],
    ),
    [1, 0],
  )
})
