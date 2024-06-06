import { relu } from "../neurons/relu.js"
import type { Tensor } from "../tensor/Tensor.js"
import { randomTensor } from "../tensor/randomTensor.js"
import type { Shape } from "../tensor/shape.js"
import { zeroTensor } from "../tensor/zeroTensor.js"
import { Block } from "./Block.js"

export function denseBlock(inputSize: number, layerWidth: number): Block {
  return Block(relu, [[layerWidth, inputSize], [layerWidth]])
}

export function denseInitParameters(shapes: Array<Shape>): Array<Tensor> {
  return shapes.map(denseInitParameter)
}

export function denseInitParameter(shape: Shape): Tensor {
  if (shape.length === 1) {
    return zeroTensor(shape)
  }

  if (shape.length === 2) {
    // const mean = 0
    const mean = 1 / 2
    const deviation = 2 / shape[1]
    return randomTensor(mean, deviation, shape)
  }

  throw new Error(`[denseInitParameter] Wrong shape: ${shape}`)
}
