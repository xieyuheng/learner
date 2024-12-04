import assert from "node:assert"
import { test } from "node:test"
import { add, line, mul, square, squareRoot, sub, sum } from "./interlude-i.ts"

test("interlude-i -- add", () => {
  assert.deepStrictEqual(add(1, 1), 2)
  assert.deepStrictEqual(add([2], [7]), [9])
  assert.deepStrictEqual(add([5, 6, 7], [2, 0, 1]), [7, 6, 8])
  assert.deepStrictEqual(
    add(
      [
        [4, 6, 7],
        [2, 0, 1],
      ],
      [
        [1, 2, 2],
        [6, 3, 1],
      ],
    ),
    [
      [5, 8, 9],
      [8, 3, 2],
    ],
  )
  assert.deepStrictEqual(add(4, [3, 6, 5]), [7, 10, 9])
  assert.deepStrictEqual(add([3, 6, 5], 4), [7, 10, 9])
  assert.deepStrictEqual(
    add(
      [6, 9, 1],
      [
        [4, 3, 8],
        [7, 4, 7],
      ],
    ),
    [
      [10, 12, 9],
      [13, 13, 8],
    ],
  )
})

test("interlude-i -- sub", () => {
  assert.deepStrictEqual(
    sub(
      [
        [4, 6, 5],
        [6, 9, 7],
      ],
      3,
    ),
    [
      [1, 3, 2],
      [3, 6, 4],
    ],
  )
  assert.deepStrictEqual(sub([2, 2, 2], [2, 2, 2]), [0, 0, 0])
})

test("interlude-i -- mul", () => {
  assert.deepStrictEqual(
    mul(
      [
        [4, 6, 5],
        [6, 9, 7],
      ],
      3,
    ),
    [
      [12, 18, 15],
      [18, 27, 21],
    ],
  )
  assert.deepStrictEqual(mul([2, 2, 2], [2, 2, 2]), [4, 4, 4])
})

test("interlude-i -- squareRoot", () => {
  assert.deepStrictEqual(squareRoot(9), 3)
  assert.deepStrictEqual(squareRoot([9, 16, 25]), [3, 4, 5])
})

test("interlude-i -- square", () => {
  assert.deepStrictEqual(square(3), 9)
  assert.deepStrictEqual(square([3, 4, 5]), [9, 16, 25])
})

test("interlude-i -- sum", () => {
  assert.deepStrictEqual(sum([10, 12, 14]), 36)
  assert.deepStrictEqual(
    sum([
      [
        [1, 2],
        [3, 4],
      ],
      [
        [5, 6],
        [7, 8],
      ],
    ]),
    [
      [3, 7],
      [11, 15],
    ],
  )
})

test("interlude-i -- line", () => {
  assert.deepStrictEqual(line(1)([2, 3]), 5)
  assert.deepStrictEqual(line([2, 7, 5, 11])([4, 6]), [14, 34, 26, 50])
})
