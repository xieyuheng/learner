import { tensorZeros, type Tensor } from "../tensor/index.ts"
import { add, mul, sub } from "../toys/index.ts"
import type { Representation } from "./Representation.ts"
import { gradientDescent } from "./gradientDescent.ts"

export function velocityRepresentation(options: {
  learningRate: number
  relayFactor: number
}): Representation<[Tensor, Tensor]> {
  return {
    inflate: (p) => [p, tensorZeros(p)],
    deflate: ([p, _]) => p,
    update: ([p, prevVelocity], g) => {
      const v = sub(
        mul(prevVelocity, options.relayFactor),
        mul(g, options.learningRate),
      )
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
