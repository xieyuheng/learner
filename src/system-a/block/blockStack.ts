import { arrayAppend } from "../../utils/arrayAppend.js"
import { Block, type BlockFn } from "./Block.js"
import { emptyBlock } from "./emptyBlock.js"

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
    blockFnCompose(x.fn, y.fn, x.shapes.length),
    arrayAppend(x.shapes, y.shapes),
  )
}

export function blockStack(blocks: Array<Block>): Block {
  let resultBlock = emptyBlock
  for (const block of blocks) {
    resultBlock = blockStack2(resultBlock, block)
  }

  return resultBlock
}
