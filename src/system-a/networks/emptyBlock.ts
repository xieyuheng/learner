import { Block } from "./Block.js"

export const emptyBlock = Block(
  (t) =>
    (...ps) =>
      t,
  [],
)
