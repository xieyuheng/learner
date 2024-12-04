import { isScalar, type Scalar } from "./Scalar.ts"
import { isTensor, type Tensor } from "./Tensor.ts"
import { tensorAlmostEqual } from "./tensorAlmostEqual.ts"

export function assertScalar(t: any): asserts t is Scalar {
  if (!isScalar(t)) {
    throw new Error(`[assertScalar] ${t}`)
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
