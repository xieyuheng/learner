import type { Tensor } from "../tensor/Tensor.js"
import { sum } from "../toys/sum.js"
import { div } from "../toys/toys.js"
import {
  compareClassification,
  type Classification,
} from "./compareClassification.js"
import type { Model } from "./model.js"

export function modelAccuracy(
  model: Model,
  xs: Classification,
  ys: Classification,
): Tensor {
  return accuracy(model(xs) as Classification, ys)
}

export function accuracy(xs: Classification, ys: Classification): Tensor {
  return div(sum(compareClassification(xs, ys)), xs.length)
}
