import { type Tensor } from "./Tensor.js"
import { tensorMap } from "./tensorMap.js"

export function tensorZeros(tensor: Tensor): Tensor {
  return tensorMap(tensor, (_) => 0)
}
