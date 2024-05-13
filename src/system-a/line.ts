import { type Tensor } from "./index.js"
import { add, mul } from "./toys/index.js"

export function line(x: Tensor): (...ps: [number, number]) => Tensor {
  return (ps0, ps1) => add(mul(ps0, x), ps1)
}
