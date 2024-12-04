import { type Tensor } from "../tensor/index.ts"
import { square, sub, sum } from "../toys/index.ts"

export type Target = (xs: Tensor) => (...ps: Array<Tensor>) => Tensor
export type Expectant = (xs: Tensor, ys: Tensor) => Objective
export type Objective = (...ps: Array<Tensor>) => Tensor

export function l2Loss(target: Target): Expectant {
  return function expectant(xs, ys) {
    return function objective(...ps) {
      const predictYs = target(xs)(...ps)
      return sum(square(sub(ys, predictYs)))
    }
  }
}
