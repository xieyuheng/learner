import { tensorZeros, type Tensor } from "../tensor/index.ts"
import { add, div, mul, square, squareRoot, sub } from "../toys/index.ts"
import type { Representation } from "./Representation.ts"
import { gradientDescent } from "./gradientDescent.ts"
import { smooth } from "./smooth.ts"

const stabilizer = 1e-8

// NOTE RMS stands for root mean square.

export function rmsRepresentation(options: {
  learningRate: number
  decayRate: number
}): Representation<[Tensor, Tensor]> {
  return {
    inflate: (p) => [p, tensorZeros(p)],
    deflate: ([p, _]) => p,
    update: ([p, learningRateModifier], g) => {
      // NOTE Use `square` to make sure `r` is positive.
      const r = smooth(options.decayRate, learningRateModifier, square(g))
      // NOTE Add `stabilizer` to avoid `div` by zero.
      const adaptiveLearningRate = div(
        options.learningRate,
        add(stabilizer, squareRoot(r)),
      )
      return [sub(p, mul(adaptiveLearningRate, g)), r]
    },
  }
}

export function gradientDescentRms(options: {
  learningRate: number
  decayRate: number
}) {
  return gradientDescent(rmsRepresentation(options))
}
