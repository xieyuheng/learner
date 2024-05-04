import { zip } from "../utils/zip.js"
import { assertNotScalar, isScalar, type Tensor } from "./chapter-2.js"

export function add(x: Tensor, y: Tensor): Tensor {
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
