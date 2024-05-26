import { isScalar, type Scalar } from "./Scalar.js"
import { isTensor, type Tensor } from "./Tensor.js"
import { rank } from "./rank.js"
import { tensorAlmostEqual } from "./tensorAlmostEqual.js"

export function assertScalar(t: any): asserts t is Scalar {
  if (!isScalar(t)) {
    throw new Error(`[assertScalar] ${t}`)
  }
}

export function assertTensor1(t: Tensor): asserts t is Array<Scalar> {
  if (rank(t) !== 1) {
    throw new Error(`[assertTensor1] ${t}`)
  }
}

export function assertTensorRankAbove1(x: any): asserts x is Array<Tensor> {
  if (x instanceof Array && x.every(isTensor)) {
    return
  }

  throw new Error(`[assertTensorRankAbove1] ${x}`)
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
