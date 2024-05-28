import { relu } from "../neurons/relu.js"
import { Block, type BlockFn } from "./Block.js"

export function denseBlock(inputSize: number, layerWidth: number): Block {
  return Block(relu as BlockFn, [[layerWidth, inputSize], [layerWidth]])
}
