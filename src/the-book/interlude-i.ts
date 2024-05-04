import { zip } from "../utils/zip.js"
import { assertNotScalar, isScalar, assertTensor1, rank, type Tensor } from "./chapter-2.js"

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

export function mul(x: Tensor, y: Tensor): Tensor {
  if (rank(x) > rank(y)) {
    assertNotScalar(x)
    return x.map((x) => mul(x, y))
  }

  if (rank(x) < rank(y)) {
    assertNotScalar(y)
    return y.map((y) => mul(x, y))
  }

  return mulSameShape(x, y)
}

export function mulSameShape(x: Tensor, y: Tensor): Tensor {
  if (isScalar(x) && isScalar(y)) {
    return x * y
  }

  assertNotScalar(x)
  assertNotScalar(y)

  return zip(x, y).map(([x, y]) => mulSameShape(x, y))
}

export function sqrt(x: Tensor): Tensor {
  if (isScalar(x)) {
    return Math.sqrt(x)
  }

  return x.map((x) => sqrt(x))
}

export function sum1(xs: Array<number>): number {
  return xs.reduce((x, result) => x + result, 0)
}

export function sum(x: Tensor): Tensor {
  assertNotScalar(x)
  if (rank(x) === 1) {
    assertTensor1(x)
    return sum1(x)
  }

  return x.map(x => sum(x))
}
