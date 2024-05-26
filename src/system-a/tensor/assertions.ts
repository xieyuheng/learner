import { isScalar, type Scalar } from "./Scalar.js"
import { isTensor, type Tensor } from "./Tensor.js"
import { tensorAlmostEqual } from "./tensorAlmostEqual.js"

export function assertScalar(t: any): asserts t is Scalar {
  if (!isScalar(t)) {
    throw new Error(`[assertScalar] ${t}`)
  }
}

export type TensorRankAbove1 = Array<Tensor>

export function assertTensorRankAbove1(x: any): asserts x is TensorRankAbove1 {
  if (x instanceof Array && x.every(isTensor)) {
    return
  }

  throw new Error(`[assertTensorRankAbove1] ${x}`)
}

export type TensorRankAbove2 = Array<Array<Tensor>>

export function assertTensorAlmostEqual(
  x: Tensor,
  y: Tensor,
  epsilon: number,
): void {
  if (!tensorAlmostEqual(x, y, epsilon)) {
    throw new Error(`[assertTensorAlmostEqual] [${x}], [${y}], ${epsilon}`)
  }
}
