import { sub } from "../toys/index.js"
import { scalarReal } from "./Scalar.js"
import { type Tensor } from "./Tensor.js"
import { tensorEvery } from "./tensorEvery.js"

export function tensorAlmostEqual(
  x: Tensor,
  y: Tensor,
  epsilon: number,
): boolean {
  return tensorEvery(sub(x, y), (x) => Math.abs(scalarReal(x)) <= epsilon)
}
