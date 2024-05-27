import type { Shape, Tensor } from "../tensor/index.js"

export type BlockFn = (t: Array<Tensor>) => (...ps: Array<Tensor>) => Tensor

export type Block = {
  "@type": "Block"
  fn: BlockFn
  shapes: Array<Shape>
}

export function Block(fn: BlockFn, shapes: Array<Shape>): Block {
  return {
    "@type": "Block",
    fn,
    shapes,
  }
}
