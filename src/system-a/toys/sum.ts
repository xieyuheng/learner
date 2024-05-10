import {
  addScalar,
  assertNotScalar,
  assertTensor1,
  rank,
  type Scalar,
  type Tensor,
} from "../index.js"

export function sum1(xs: Array<Scalar>): Scalar {
  return xs.reduce((x, result) => addScalar(x, result), 0)
}

export function sumAux(x: Tensor): Tensor {
  assertNotScalar(x)
  if (rank(x) === 1) {
    assertTensor1(x)
    return sum1(x)
  }

  return x.map((x) => sumAux(x))
}

export function sum(...xs: Array<Tensor>): Tensor {
  return sumAux(xs)
}
