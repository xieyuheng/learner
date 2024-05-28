import { randomGaussian } from "../../utils/randomGaussian.js"
import { repeatApply } from "../../utils/repeatApply.js"
import type { Tensor } from "./Tensor.js"
import type { Shape } from "./shape.js"

export function randomTensor(
  mean: number,
  variance: number,
  shape: Shape,
): Tensor {
  if (shape.length === 0) return randomGaussian(mean, Math.sqrt(variance))

  const [length, ...restShape] = shape
  return repeatApply(length, randomTensor, [mean, variance, restShape])
}
