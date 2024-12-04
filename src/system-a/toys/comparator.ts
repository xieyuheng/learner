import { scalarReal, type Scalar } from "../tensor/index.ts"

export function comparator(
  p: (x: number, y: number) => boolean,
): (x: Scalar, y: Scalar) => boolean {
  return (x, y) => p(scalarReal(x), scalarReal(y))
}
