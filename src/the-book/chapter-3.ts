import { type Tensor } from "./chapter-2.js"
import { square, sub, sum } from "./interlude-i.js"

export function l2Loss<Parameters extends Tensor>(
  target: (xs: Tensor) => (ps: Parameters) => Tensor,
): (xs: Tensor, ys: Tensor) => (ps: Parameters) => number {
  return function expectant(xs, ys) {
    return function objective(ps) {
      const predYs = target(xs)(ps)
      return sum(square(sub(ys, predYs))) as number
    }
  }
}
