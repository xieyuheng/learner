import { zip } from "../utils/zip.js"
import { assertNotScalar, isScalar, rank, type Tensor } from "./chapter-2.js"

export function add(x: Tensor, y: Tensor): Tensor {
  if (rank(x) > rank(y)) {
    assertNotScalar(x)
    return x.map((x) => add(x, y))
  }

  if (rank(x) < rank(y)) {
    assertNotScalar(y)
    return y.map((y) => add(x, y))
  }

  return addSameShape(x, y)
}

export function addSameShape(x: Tensor, y: Tensor): Tensor {
  if (isScalar(x) && isScalar(y)) {
    return x + y
  }

  assertNotScalar(x)
  assertNotScalar(y)

  return zip(x, y).map(([x, y]) => addSameShape(x, y))
}

// mul
// sqrt0
// sqrt
// sum
// sum1
