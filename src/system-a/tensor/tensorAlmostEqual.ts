import { sub } from "../toys/index.ts"
import { scalarReal } from "./Scalar.ts"
import { type Tensor } from "./Tensor.ts"
import { tensorEvery } from "./tensorEvery.ts"

export function tensorAlmostEqual(
  x: Tensor,
  y: Tensor,
  epsilon: number,
): boolean {
  return tensorEvery(sub(x, y), (x) => Math.abs(scalarReal(x)) <= epsilon)
}
