import { arrayAppend } from "../../utils/arrayAppend.js"
import { Block, type BlockFn } from "./Block.js"

// NOTE Be careful about the order of applications,
// `f` first, then `g`.
export function blockFnCompose(f: BlockFn, g: BlockFn, j: number): BlockFn {
  return (t) =>
    (...ps) => {
      const nextT = f(t)(...ps)
      return g(nextT)(...ps.slice(j))
    }
}

export function blockStack2(x: Block, y: Block): Block {
  return Block(
    blockFnCompose(x.fn, y.fn, x.shapeList.length),
    arrayAppend(x.shapeList, y.shapeList),
  )
}

// blockStack
