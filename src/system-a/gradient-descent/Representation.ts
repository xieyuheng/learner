import type { Tensor } from "../tensor/index.ts"

export interface Representation<R> {
  inflate: (p: Tensor) => R
  deflate: (r: R) => Tensor
  update: (r: R, g: Tensor) => R
}
