import type { Tensor } from "../tensor/Tensor.js"
import {
  assertTensorRankAbove1,
  type TensorRankAbove2,
} from "../tensor/assertions.js"
import { relu } from "./relu.js"

type Target = (t: Array<Tensor>) => (...ps: Array<Tensor>) => Tensor

export function multiLayerRelu(k: number): Target {
  return (xs) =>
    (...ps) => {
      if (k <= 0) return xs

      const nextXs = relu(xs)(ps[0] as TensorRankAbove2, ps[1])
      assertTensorRankAbove1(nextXs)
      return multiLayerRelu(k - 1)(nextXs)(...ps.slice(2))
    }
}
