import { isScalar, type Scalar } from "./Scalar.js"
import { type Tensor } from "./Tensor.js"

export function tensorMap(tensor: Tensor, fn: (x: Scalar) => Scalar): Tensor {
  if (isScalar(tensor)) {
    return fn(tensor)
  } else {
    return tensor.map((e) => tensorMap(e, fn))
  }
}
