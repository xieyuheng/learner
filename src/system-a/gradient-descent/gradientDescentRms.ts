import { tensorZeros, type Tensor } from "../tensor/index.js"
import { add, div, mul, square, squareRoot, sub } from "../toys/index.js"
import type { Representation } from "./Representation.js"
import { gradientDescent } from "./gradientDescent.js"
import { smooth } from "./smooth.js"

const stabilizer = 1e-8

export function gradientDescentRms(options: {
  learningRate: number
  decayRate: number
}): Representation<[Tensor, Tensor]> {
  return {
    inflate: (p) => [p, tensorZeros(p)],
    deflate: ([p, _]) => p,
    update: ([p, average], g) => {
      // NOTE Use `square` to make sure `r` is positive.
      const r = smooth(options.decayRate, average, square(g))
      // NOTE Add `stabilizer` to avoid `div` by zero.
      const adaptiveLearningRate = div(
        options.learningRate,
        add(stabilizer, squareRoot(r)),
      )
      return [sub(p, mul(adaptiveLearningRate, g)), r]
    },
  }
}

export function gradientDescentVelocity(options: {
  learningRate: number
  decayRate: number
}) {
  return gradientDescent(gradientDescentRms(options))
}
