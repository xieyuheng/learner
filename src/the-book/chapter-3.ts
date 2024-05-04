import { type Tensor } from "./chapter-2.js"
import { square, sub, sum } from "./interlude-i.js"

export function l2Loss(
  target: (xs: Tensor) => (ps: any) => Tensor,
): (xs: Tensor, ys: Tensor) => (ps: Tensor) => number {
  return function expectant(xs, ys) {
    return function objective(ps) {
      const predYs = target(xs)(ps)
      // TODO `l2Loss` can only take `Tensor1`.
      return sum(square(sub(ys, predYs))) as number
    }
  }
}
