import {
  blockStack,
  denseBlock,
  denseInitParameters,
} from "../../block/index.js"
import { gradientDescentAdam } from "../../gradient-descent/gradientDescentAdam.js"
import { gradientDescentNaked } from "../../gradient-descent/gradientDescentNaked.js"
import { gradientDescentRms } from "../../gradient-descent/gradientDescentRms.js"
import { l2Loss } from "../../loss/index.js"
import type { Tensor } from "../../tensor/Tensor.js"
import { samplingObjective } from "../../tensor/samplingObjective.js"
import { model } from "../model.js"
import { irisTrainXs, irisTrainYs } from "./irisDataset.js"

// export const irisNetwork = blockStack([
//   denseBlock(4, 6),
//   denseBlock(6, 4),
//   denseBlock(4, 3),
//   denseBlock(3, 3),
// ])

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

  gradientDescentNaked
  // const gradientDescentFn = gradientDescentNaked({
  //   learningRate: 0.0002,
  // })

  gradientDescentRms
  // const gradientDescentFn = gradientDescentRms({
  //   learningRate: 0.006,
  //   decayRate: 0.9,
  // })

  gradientDescentAdam
  const gradientDescentFn = gradientDescentAdam({
    learningRate: 0.01,
    decayRate: 0.9,
    relayFactor: 0.85,
  })

  return gradientDescentFn(objective, initParameters, {
    revs: 1000,
  })
}

export const irisModel = model(irisNetwork.fn, irisTrainParameters())
