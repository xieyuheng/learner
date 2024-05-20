import { scalarReal } from "./Scalar.js"
import { type Tensor } from "./Tensor.js"
import { tensorMap } from "./tensorMap.js"

export function tensorReal(tensor: Tensor): Tensor {
  return tensorMap(tensor, scalarReal)
}
