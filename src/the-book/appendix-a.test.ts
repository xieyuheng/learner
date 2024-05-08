import assert from "node:assert"
import { test } from "node:test"
import { tensorMap } from "./appendix-a.js"

test("appendix-a -- tensorMap", () => {
  assert.deepStrictEqual(
    tensorMap(
      (x) => (x as number) + 1,
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
    ),
    [
      [2, 3, 4],
      [5, 6, 7],
    ],
  )
})
