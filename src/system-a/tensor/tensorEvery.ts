import { isScalar, type Scalar } from "./Scalar.ts"
import { type Tensor } from "./Tensor.ts"

export function tensorEvery(
  tensor: Tensor,
  p: (x: Scalar) => boolean,
): boolean {
  if (isScalar(tensor)) {
    return p(tensor)
  } else {
    return tensor.every((e) => tensorEvery(e, p))
  }
}
