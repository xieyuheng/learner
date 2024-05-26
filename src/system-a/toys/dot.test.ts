import assert from "node:assert"
import { test } from "node:test"
import { tensorReal } from "../tensor/index.js"
import { dot } from "./dot.js"

test("dot", () => {
  assert.deepStrictEqual(tensorReal(dot([1, 2, 3], [1, 2, 3])), 14)
})

test("dot -- extended", () => {
  assert.deepStrictEqual(
    tensorReal(
      dot(
        [
          [1, 2, 3],
          [4, 5, 6],
        ],
        [
          [1, 2, 3],
          [4, 5, 6],
        ],
      ),
    ),
    [14, 77],
  )
})

test("dot -- 2 1", () => {
  assert.deepStrictEqual(
    tensorReal(
      dot(
        [
          [2, 1, 3.1],
          [3.7, 4, 6.1],
        ],
        [1.3, 0.4, 3.3],
      ),
    ),
    [13.23, 26.54],
  )
})
