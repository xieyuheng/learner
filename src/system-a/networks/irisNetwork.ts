import { blockStack } from "./blockStack.js"
import { denseBlock } from "./denseBlock.js"

export const irisNetwork = blockStack([denseBlock(4, 6), denseBlock(6, 3)])
