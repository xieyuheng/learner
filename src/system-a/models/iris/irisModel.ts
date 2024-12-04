import { blockStack } from "../../block/index.ts"
import { gradientDescentAdam } from "../../gradient-descent/gradientDescentAdam.ts"
import { gradientDescentNaked } from "../../gradient-descent/gradientDescentNaked.ts"
import { gradientDescentRms } from "../../gradient-descent/gradientDescentRms.ts"
import { l2Loss } from "../../loss/index.ts"
import {
  denseBlock,
  denseBlockInitParameters,
} from "../../perceptrons/relu/index.ts"
import type { Tensor } from "../../tensor/Tensor.ts"
import { samplingObjective } from "../../tensor/samplingObjective.ts"
import { model } from "../model.ts"
import { irisTrainXs, irisTrainYs } from "./irisDataset.ts"

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

  const initParameters = denseBlockInitParameters(irisNetwork.shapes)

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
    learningRate: 0.002,
    decayRate: 0.9,
    relayFactor: 0.85,
  })

  return gradientDescentFn(objective, initParameters, {
    revs: 2000,
  })
}

export const irisModel = model(irisNetwork.fn, irisTrainParameters())
