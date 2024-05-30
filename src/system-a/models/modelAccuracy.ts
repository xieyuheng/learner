import type { Tensor } from "../tensor/Tensor.js"
import { assertTensorArray } from "../tensor/assertions.js"
import { sum } from "../toys/sum.js"
import { div } from "../toys/toys.js"
import { compareClassification } from "./compareClassification.js"
import type { Model } from "./model.js"

export function modelAccuracy(model: Model, xs: Tensor, ys: Tensor): Tensor {
  return accuracy(model(xs), ys)
}

export function accuracy(xs: Tensor, ys: Tensor): Tensor {
  assertTensorArray(xs)
  return div(sum(compareClassification(xs, ys)), xs.length)
}
