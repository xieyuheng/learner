import type { Shape, Tensor } from "../tensor/index.ts"

export type BlockFn = (t: Tensor) => (...ps: Array<Tensor>) => Tensor

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
