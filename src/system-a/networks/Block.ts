import type { Shape, Tensor } from "../tensor/index.js"

export type BlockFn = (t: Tensor) => (...ps: Array<Tensor>) => Tensor

export type Block = {
  "@type": "Block"
  fn: BlockFn
  shapeList: Array<Shape>
}

export function Block(fn: BlockFn, shapeList: Array<Shape>): Block {
  return {
    "@type": "Block",
    fn,
    shapeList,
  }
}
