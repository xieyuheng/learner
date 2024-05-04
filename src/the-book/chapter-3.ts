import { type Tensor } from "./chapter-2.js"
import { square, sub, sum } from "./interlude-i.js"

export function l2Loss(
  target: (xs: Tensor) => (θ: any) => Tensor,
): (xs: Tensor, ys: Tensor) => (θ: Tensor) => number {
  return function expectant(xs, ys) {
    return function objective(θ: Tensor) {
      const predYs = target(xs)(θ)
      // TODO `l2Loss` can only take `Tensor1`.
      return sum(square(sub(ys, predYs))) as number
    }
  }
}
