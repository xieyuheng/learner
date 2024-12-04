import type { Tensor } from "../tensor/index.ts"
import { mul, sub } from "../toys/index.ts"
import type { Representation } from "./Representation.ts"
import { gradientDescent } from "./gradientDescent.ts"

export function nakedRepresentation(options: {
  learningRate: number
}): Representation<Tensor> {
  return {
    inflate: (p) => p,
    deflate: (p) => p,
    update: (p, g) => sub(p, mul(options.learningRate, g)),
  }
}

export function gradientDescentNaked(options: { learningRate: number }) {
  return gradientDescent(nakedRepresentation(options))
}
