import { assertTensor1, isScalar, isTensor1, type Tensor } from "./tensor.js"

export function sum1(t: Tensor): number {
  assertTensor1(t)
  return summed(t, t.length - 1, 0)
  function summed(t: Array<number>, i: number, a: number): number {
    if (i === 0) {
      return a + t[0]
    } else {
      return summed(t, i - 1, a + t[i])
    }
  }
}

export function sum(t: Tensor): Tensor {
  return summed(t)
  function summed(t: Tensor): Tensor {
    if (isScalar(t)) {
      return t
    }
    if (isTensor1(t)) {
      return sum1(t)
    } else {
      return t.map(summed)
    }
  }
}
