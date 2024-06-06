// import assert from "node:assert"
// import { test } from "node:test"
// import { assertTensorAlmostEqual } from "../../tensor/assertions.js"
// import { rectify, relu } from "./relu.js"

// test("rectify", () => {
//   assert.deepStrictEqual(
//     rectify([
//       [-1, -2, -3],
//       [1, 2, 3],
//     ]),
//     [
//       [0, 0, 0],
//       [1, 2, 3],
//     ],
//   )
// })

// test("relu", () => {
//   assertTensorAlmostEqual(
//     relu([2, 1, 3])(
//       [
//         [7.1, 4.3, -6.4],
//         [7.1, 4.3, -6.4],
//       ],
//       [0.6, 1],
//     ),
//     [0, 0.3],
//     0.01,
//   )

//   assertTensorAlmostEqual(
//     relu([2, 1, 3])(
//       [
//         [7.1, 4.3, -6.4],
//         [7.1, 4.3, -6.4],
//       ],
//       [0.6, 0.6],
//     ),
//     [0, 0],
//     0,
//   )

//   assertTensorAlmostEqual(
//     relu([2, 1, 3])(
//       [
//         [7.1, 4.3, -6.4],
//         [7.1, 4.3, -6.4],
//       ],
//       0.6,
//     ),
//     [0, 0],
//     0,
//   )
// })
