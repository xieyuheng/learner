import { randomGaussian } from "../../utils/randomGaussian.ts"
import { repeatApply } from "../../utils/repeatApply.ts"
import type { Tensor } from "./Tensor.ts"
import type { Shape } from "./shape.ts"

export function randomTensor(
  mean: number,
  variance: number,
  shape: Shape,
): Tensor {
  if (shape.length === 0) return randomGaussian(mean, Math.sqrt(variance))

  const [length, ...restShape] = shape
  return repeatApply(length, randomTensor, [mean, variance, restShape])
}
