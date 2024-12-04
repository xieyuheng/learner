import { Block } from "./Block.ts"

export const emptyBlock = Block(
  (t) =>
    (...ps) =>
      t,
  [],
)
