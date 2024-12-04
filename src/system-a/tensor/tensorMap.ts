import { isScalar, type Scalar } from "./Scalar.ts"
import { type Tensor } from "./Tensor.ts"

export function tensorMap(tensor: Tensor, fn: (x: Scalar) => Scalar): Tensor {
  if (isScalar(tensor)) {
    return fn(tensor)
  } else {
    return tensor.map((e) => tensorMap(e, fn))
  }
}
