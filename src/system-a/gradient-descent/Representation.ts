import type { Tensor } from "../tensor/index.js"

export interface Representation<R> {
  inflate: (p: Tensor) => R
  deflate: (r: R) => Tensor
  update: (r: R) => R
}
