import { blockStack, denseBlock, denseInitParameters } from "../block/index.js"
import { gradientDescentNaked } from "../gradient-descent/gradientDescentNaked.js"
import { l2Loss } from "../loss.js"
import type { Tensor } from "../tensor/Tensor.js"
import { samplingObjective } from "../tensor/samplingObjective.js"
import { irisTrainXs, irisTrainYs } from "./irisDataset.js"
import { model } from "./model.js"

export const irisNetwork = blockStack([denseBlock(4, 6), denseBlock(6, 3)])

export function irisTrainParameters(): Array<Tensor> {
  const objective = samplingObjective(
    l2Loss(irisNetwork.fn),
    irisTrainXs,
    irisTrainYs,
    {
      batchSize: 8,
    },
  )

  const initParameters = denseInitParameters(irisNetwork.shapes)

  const gradientDescentFn = gradientDescentNaked({
    learningRate: 0.0002,
  })

  return gradientDescentFn(objective, initParameters, {
    revs: 2000,
  })
}

export const irisModel = model(irisNetwork.fn, irisTrainParameters())
