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
