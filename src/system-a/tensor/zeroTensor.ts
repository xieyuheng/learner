import { repeatApply } from "../../utils/repeatApply.js"
import type { Tensor } from "./Tensor.js"
import type { Shape } from "./shape.js"

export function zeroTensor(shape: Shape): Tensor {
  if (shape.length === 0) return 0

  const [length, ...restShape] = shape
  return repeatApply(length, zeroTensor, [restShape])
}
