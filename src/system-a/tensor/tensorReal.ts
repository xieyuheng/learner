import { scalarReal } from "./Scalar.ts"
import { type Tensor } from "./Tensor.ts"
import { tensorMap } from "./tensorMap.ts"

export function tensorReal(tensor: Tensor): Tensor {
  return tensorMap(tensor, scalarReal)
}
