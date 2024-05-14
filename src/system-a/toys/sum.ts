import {
  assertNotScalar,
  assertTensor1,
  rank,
  type Scalar,
  type Tensor,
} from "../index.js"
import { addScalar } from "./index.js"

export function sum1(xs: Array<Scalar>): Scalar {
  return xs.reduce((x, result) => addScalar(x, result), 0)
}

export function sum(x: Tensor): Tensor {
  assertNotScalar(x)
  if (rank(x) === 1) {
    assertTensor1(x)
    return sum1(x)
  }

  return x.map((x) => sum(x))
}
