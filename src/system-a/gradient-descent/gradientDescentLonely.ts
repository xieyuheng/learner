import type { Tensor } from "../tensor/index.js"
import { mul, sub } from "../toys/index.js"
import type { Representation } from "./Representation.js"
import { gradientDescent } from "./gradientDescent.js"

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
