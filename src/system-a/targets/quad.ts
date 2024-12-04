import { type Tensor } from "../tensor/index.ts"
import { add, mul, square } from "../toys/index.ts"

export function quad(x: Tensor): (...ps: [Tensor, Tensor, Tensor]) => Tensor {
  return (ps0, ps1, ps2) => add(mul(ps0, square(x)), add(mul(ps1, x), ps2))
}
