import type { Tensor } from "./index.js"

export function revise<Parameters extends Tensor>(
  fn: (ps: Parameters) => Parameters,
  revs: number,
  ps: Parameters,
): Parameters {
  while (revs > 0) {
    ps = fn(ps)
    revs--
  }

  return ps
}
