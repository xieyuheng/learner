import { type Tensor } from "./index.js"
import { square, sub, sum } from "./toys/index.js"

export function l2Loss<Parameter extends Tensor>(
  target: (xs: Tensor) => (...ps: Array<Parameter>) => Tensor,
): (xs: Tensor, ys: Tensor) => (...ps: Array<Parameter>) => number {
  return function expectant(xs, ys) {
    return function objective(...ps) {
      const predYs = target(xs)(...ps)
      return sum(square(sub(ys, predYs))) as number
    }
  }
}
