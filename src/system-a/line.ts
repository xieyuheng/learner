import { add, mul, type Tensor } from "./index.js"

export function line(x: Tensor): (ps: [number, number]) => Tensor {
  return (ps) => add(mul(ps[0], x), ps[1])
}
