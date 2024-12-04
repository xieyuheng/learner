import type { Tensor } from "../tensor/index.ts"
import { mul, sub } from "../toys/index.ts"
import type { Representation } from "./Representation.ts"
import { gradientDescent } from "./gradientDescent.ts"

export function lonelyRepresentation(options: {
  learningRate: number
}): Representation<[Tensor]> {
  return {
    inflate: (p) => [p],
    deflate: ([p]) => p,
    update: ([p], g) => [sub(p, mul(options.learningRate, g))],
  }
}

export function gradientDescentLonely(options: { learningRate: number }) {
  return gradientDescent(lonelyRepresentation(options))
}
