import { tensorZeros, type Tensor } from "../tensor/index.ts"
import { add, div, mul, square, squareRoot, sub } from "../toys/index.ts"
import type { Representation } from "./Representation.ts"
import { gradientDescent } from "./gradientDescent.ts"
import { smooth } from "./smooth.ts"

const stabilizer = 1e-8

// NOTE ADAM is short for adaptive moment estimation.
// The accompaniment `historicalAverageGradient` is known as
// the gradient's 1st moment and `learningRateModifier` its 2nd moment.

export function adamRepresentation(options: {
  learningRate: number
  relayFactor: number
  decayRate: number
}): Representation<[Tensor, Tensor, Tensor]> {
  return {
    inflate: (p) => [p, tensorZeros(p), tensorZeros(p)],
    deflate: ([p, ...rest]) => p,
    update: ([p, historicalAverageGradient, learningRateModifier], g) => {
      const r = smooth(options.decayRate, learningRateModifier, square(g))
      const adaptiveLearningRate = div(
        options.learningRate,
        add(stabilizer, squareRoot(r)),
      )
      const newG = smooth(options.relayFactor, historicalAverageGradient, g)
      return [sub(p, mul(adaptiveLearningRate, newG)), newG, r]
    },
  }
}

export function gradientDescentAdam(options: {
  learningRate: number
  relayFactor: number
  decayRate: number
}) {
  return gradientDescent(adamRepresentation(options))
}
