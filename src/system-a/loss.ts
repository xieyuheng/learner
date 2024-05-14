import { type Tensor } from "./index.js"
import { square, sub, sum } from "./toys/index.js"

export type Target = (xs: Tensor) => (...ps: Array<Tensor>) => Tensor
export type Expectant = (xs: Tensor, ys: Tensor) => Objective
export type Objective = (...ps: Array<Tensor>) => number

export function l2Loss(target: Target): Expectant {
  return function expectant(xs, ys) {
    return function objective(...ps) {
      const predYs = target(xs)(...ps)
      return sum(square(sub(ys, predYs))) as number
    }
  }
}
