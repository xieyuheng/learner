import type { Tensor } from "../tensor/Tensor.ts"
import { assertTensorArray } from "../tensor/assertions.ts"
import { sum } from "../toys/sum.ts"
import { div } from "../toys/toys.ts"
import { compareClassification } from "./compareClassification.ts"
import type { Model } from "./model.ts"

export function modelAccuracy(model: Model, xs: Tensor, ys: Tensor): Tensor {
  return accuracy(model(xs), ys)
}

export function accuracy(xs: Tensor, ys: Tensor): Tensor {
  assertTensorArray(xs)
  return div(sum(compareClassification(xs, ys)), xs.length)
}
