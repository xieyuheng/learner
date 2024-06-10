import { compareClassification } from "./compareClassification.js"
import assert from "node:assert"
import { test } from "node:test"

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
