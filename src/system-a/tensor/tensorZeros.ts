import { type Tensor } from "./Tensor.ts"
import { tensorMap } from "./tensorMap.ts"

export function tensorZeros(tensor: Tensor): Tensor {
  return tensorMap(tensor, (_) => 0)
}
