import { Block } from "./Block.js"
import { relu } from "./relu.js"

export function denseBlock(inputSize: number, layerWidth: number): Block {
  return Block(relu as BlockFn, [[layerWidth, inputSize], [layerWidth]])
}
