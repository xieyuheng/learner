import type { Tensor } from "./index.js"

export function revise<Ps extends Tensor>(
  fn: (ps: Ps) => Ps,
  counter: number,
  ps: Ps,
): Ps {
  while (counter > 0) {
    ps = fn(ps)
    counter--
  }

  return ps
}
