import { assertScalar, type Scalar, type Tensor } from "./tensor/index.js"
import { square, sub, sum } from "./toys/index.js"

export type Target = (xs: Tensor) => (...ps: Array<Tensor>) => Tensor
export type Expectant = (xs: Tensor, ys: Tensor) => Objective
export type Objective = (...ps: Array<Tensor>) => Scalar

export function l2Loss(target: Target): Expectant {
  return function expectant(xs, ys) {
    return function objective(...ps) {
      const predYs = target(xs)(...ps)
      const result = sum(square(sub(ys, predYs)))
      assertScalar(result)
      return result
    }
  }
}
