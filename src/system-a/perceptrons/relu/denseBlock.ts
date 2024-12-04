import { Block } from "../../block/index.ts"
import type { Tensor } from "../../tensor/Tensor.ts"
import { randomTensor } from "../../tensor/randomTensor.ts"
import type { Shape } from "../../tensor/shape.ts"
import { zeroTensor } from "../../tensor/zeroTensor.ts"
import { leakyRelu } from "./leakyRelu.ts"

export function denseBlock(inputSize: number, layerWidth: number): Block {
  return Block(leakyRelu, [[layerWidth, inputSize], [layerWidth]])
}

export function denseBlockInitParameters(shapes: Array<Shape>): Array<Tensor> {
  return shapes.map(denseInitParameter)
}

export function denseInitParameter(shape: Shape): Tensor {
  if (shape.length === 1) {
    return zeroTensor(shape)
  }

  if (shape.length === 2) {
    // TODO Is it right to use 1 instead of 0
    // for the mostly positive iris data?
    const mean = 1
    const deviation = 2 / shape[1]
    return randomTensor(mean, deviation, shape)
  }

  throw new Error(`[denseInitParameter] Wrong shape: ${shape}`)
}
