import { tensorZeros, type Tensor } from "../tensor/index.js"
import { add, mul, sub } from "../toys/index.js"
import type { Representation } from "./Representation.js"
import { gradientDescent } from "./gradientDescent.js"

export function velocityRepresentation(options: {
  learningRate: number
  relayFactor: number
}): Representation<[Tensor, Tensor]> {
  return {
    inflate: (p) => [p, tensorZeros(p)],
    deflate: ([p, _]) => p,
    update: ([p, w], g) => {
      const v = sub(mul(w, options.relayFactor), mul(g, options.learningRate))
      return [add(p, v), v]
    },
  }
}

export function gradientDescentVelocity(options: {
  learningRate: number
  relayFactor: number
}) {
  return gradientDescent(velocityRepresentation(options))
}
