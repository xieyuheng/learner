import type { Tensor } from "./index.js"

export function revise(
  fn: (ps: Tensor) => Tensor,
  counter: number,
  ps: Tensor,
): Tensor {
  while (counter > 0) {
    ps = fn(ps)
    counter--
  }

  return ps
}
