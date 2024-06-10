import { add, mul, sum } from "../toys/index.js"
import { gradient } from "./gradient.js"
import assert from "node:assert"
import { test } from "node:test"

test("gradient -- add", () => {
  assert.deepStrictEqual(gradient(add, [1, 1]), [1, 1])
  assert.deepStrictEqual(gradient(add, [[1], [1]]), [[1], [1]])
  assert.deepStrictEqual(gradient(add, [2, 3]), [1, 1])
})

test("gradient -- sum", () => {
  assert.deepStrictEqual(gradient(sum, [[1, 1]]), [[1, 1]])
  assert.deepStrictEqual(gradient(sum, [[1, 1, 1]]), [[1, 1, 1]])
  assert.deepStrictEqual(gradient(sum, [[1, 2, 3]]), [[1, 1, 1]])
  assert.deepStrictEqual(gradient(sum, [[1, 2, 3, 4]]), [[1, 1, 1, 1]])
})

test("gradient -- mul", () => {
  assert.deepStrictEqual(gradient(mul, [1, 1]), [1, 1])
  assert.deepStrictEqual(gradient(mul, [2, 3]), [3, 2])
  assert.deepStrictEqual(gradient(mul, [[2], [3]]), [[3], [2]])
  assert.deepStrictEqual(
    gradient(mul, [
      [1, 2],
      [3, 4],
    ]),
    [
      [3, 4],
      [1, 2],
    ],
  )
})
