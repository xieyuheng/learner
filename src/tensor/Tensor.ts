import { isScalar, type Scalar } from "./index.js"

export type Tensor = Scalar | Array<Tensor>

export function tensorMap(fn: (x: Scalar) => Scalar, tensor: Tensor): Tensor {
  if (isScalar(tensor)) {
    return fn(tensor)
  } else {
    return tensor.map((e) => tensorMap(fn, e))
  }
}
