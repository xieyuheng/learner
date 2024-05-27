import type { BlockFn } from "./Block.js"

// NOTE Be careful about the order of applications,
// `f` first, then `g`.
export function blockFnCompose(f: BlockFn, g: BlockFn, j: number): BlockFn {
  return (t) =>
    (...ps) => {
      const nextT = f(t)(...ps)
      return g(nextT)(...ps.slice(j))
    }
}

// blockStack2
// blockStack
