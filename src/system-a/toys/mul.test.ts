import { test } from "node:test"
import { mul } from "./index.js"

test("mul -- extended", () => {
  console.log(
    mul(
      [
        [1, 2],
        [3, 4],
      ],
      [5, 6],
    ),
  )
  // assert.deepStrictEqual(
  //   tensorReal(
  //     mul(
  //       (* (tensor (tensor 1 2) (tensor 3 4)) (tensor 5 6))
  //       (tensor 5 6)),
  //   ),
  //   [6, 15],
  // )
})
