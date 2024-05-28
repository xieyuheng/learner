import type { Tensor } from "./Tensor.js"
import type { Shape } from "./shape.js"

export function zeroTensor(shape: Shape): Tensor {
  if (shape.length === 0) return 0

  const [length, ...restShape] = shape
  return repeat(length, zeroTensor, restShape)
}

function repeat<A, B>(n: number, f: (x: A) => B, x: A): Array<B> {
  const results = []
  while (n > 0) {
    results.push(f(x))
    n--
  }

  return results
}
