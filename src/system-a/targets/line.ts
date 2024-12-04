import { type Tensor } from "../tensor/index.ts"
import { add, mul } from "../toys/index.ts"

export function line(x: Tensor): (...ps: [Tensor, Tensor]) => Tensor {
  return (ps0, ps1) => add(mul(ps0, x), ps1)
}
