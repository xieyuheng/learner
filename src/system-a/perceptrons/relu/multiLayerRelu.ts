import type { Tensor } from "../../tensor/Tensor.ts"
import { relu } from "./relu.ts"

type Target = (t: Tensor) => (...ps: Array<Tensor>) => Tensor

export function multiLayerRelu(k: number): Target {
  return (xs) =>
    (...ps) => {
      if (k <= 0) return xs

      const nextXs = relu(xs)(ps[0], ps[1])
      return multiLayerRelu(k - 1)(nextXs)(...ps.slice(2))
    }
}
