import { tensorZeros, type Tensor } from "../tensor/index.js"
import { mul, sub } from "../toys/index.js"
import type { Representation } from "./Representation.js"
import { gradientDescent } from "./gradientDescent.js"

export function velocityRepresentation(options: {
  learningRate: number
  velocityAccumulationFactor: number
}): Representation<[Tensor, Tensor]> {
  return {
    inflate: (p) => [p, tensorZeros(p)],
    deflate: ([p, _]) => p,
    update: ([p], g) => [sub(p, mul(options.learningRate, g))],
  }
}

export function gradientDescentVelocity(options: {
  learningRate: number
  velocityAccumulationFactor: number
}) {
  return gradientDescent(velocityRepresentation(options))
}
