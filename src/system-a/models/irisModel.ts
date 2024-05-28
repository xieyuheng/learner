import { blockStack, denseBlock } from "../block/index.js"
import type { Tensor } from "../tensor/Tensor.js"
import { randomTensor } from "../tensor/randomTensor.js"
import type { Shape } from "../tensor/shape.js"
import { zeroTensor } from "../tensor/zeroTensor.js"

export const irisNetwork = blockStack([denseBlock(4, 6), denseBlock(6, 3)])

function initParameters(shapes: Array<Shape>): Array<Tensor> {
  return shapes.map(initShape)
}

function initShape(shape: Shape): Tensor {
  if (shape.length === 1) {
    return zeroTensor(shape)
  }

  if (shape.length === 2) {
    const mean = 0
    const deviation = 2 / shape[1]
    return randomTensor(mean, deviation, shape)
  }

  throw new Error(`[initShape] Wrong shape: ${shape}`)
}
