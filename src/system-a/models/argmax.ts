import { scalarReal, type Scalar } from "../tensor/Scalar.js"

// NOTE `argmax` is only meaningful for `Tensor1`,
// for general nested `Tensor` a list of indexed
// of the nested `Tensor` should be returned.

export function argmax(array: Array<Scalar>): number {
  if (array.length === 0) {
    throw new Error(`[argmax1] The given array is empty.`)
  }

  let currentIndex = array.length - 1
  let maxIndex = array.length - 1
  while (currentIndex >= 0) {
    maxIndex = largerArgIndex(array, currentIndex, maxIndex)
    currentIndex--
  }

  return maxIndex
}

function largerArgIndex(array: Array<Scalar>, i: number, j: number): number {
  if (scalarReal(array[i]) > scalarReal(array[j])) {
    return i
  } else {
    return j
  }
}
