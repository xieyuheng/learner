import { isScalar, type Scalar } from "./Scalar.js"
import { rank } from "./rank.js"
import { tensorAlmostEqual } from "./tensorAlmostEqual.js"

export type Tensor = Scalar | Array<Tensor>

export function isTensor(x: any): x is Tensor {
  return isScalar(x) || (x instanceof Array && x.every(isTensor))
}

export function assertTensor1(t: Tensor): asserts t is Array<Scalar> {
  if (rank(t) !== 1) {
    throw new Error(`[assertTensor1] ${t}`)
  }
}

export function assertTensorArray(x: any): asserts x is Array<Tensor> {
  if (x instanceof Array && x.every(isTensor)) {
    return
  }

  throw new Error(`[assertTensorArray] ${x}`)
}

export function assertTensorAlmostEqual(
  x: Tensor,
  y: Tensor,
  epsilon: number,
): void {
  if (!tensorAlmostEqual(x, y, epsilon)) {
    throw new Error(`[assertTensorAlmostEqual] [${x}], [${y}], ${epsilon}`)
  }
}
