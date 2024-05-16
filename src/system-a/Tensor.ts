import { isScalar, scalarReal, type Scalar } from "./index.js"
import { sub } from "./toys/index.js"

export type Tensor = Scalar | Array<Tensor>

export function isTensor(x: any): x is Tensor {
  return isScalar(x) || (x instanceof Array && x.every(isTensor))
}

export function shape(t: Tensor): Array<number> {
  const result: Array<number> = []
  while (!isScalar(t)) {
    result.push(t.length)
    t = t[0]
  }

  return result
}

export function rank(t: Tensor): number {
  return shape(t).length
}

export function assertScalar(t: Tensor): asserts t is Scalar {
  if (!isScalar(t)) {
    throw new Error(`[assertScalar] ${t}`)
  }
}

export function assertNotScalar(t: Tensor): asserts t is Array<Tensor> {
  if (isScalar(t)) {
    throw new Error(`[assertNotScalar] ${t}`)
  }
}

export function assertTensor1(t: Tensor): asserts t is Array<Scalar> {
  if (rank(t) !== 1) {
    throw new Error(`[assertTensor1] ${t}`)
  }
}

export function assertTensorArray(x: any): asserts x is Array<Tensor> {
  if (x instanceof Array && x.every(isTensor)) {
    return
  }

  throw new Error(`[assertTensorArray] ${x}`)
}

export function tensorMap(tensor: Tensor, fn: (x: Scalar) => Scalar): Tensor {
  if (isScalar(tensor)) {
    return fn(tensor)
  } else {
    return tensor.map((e) => tensorMap(e, fn))
  }
}

export function tensorReal(tensor: Tensor): Tensor {
  return tensorMap(tensor, scalarReal)
}

export function tensorEvery(
  tensor: Tensor,
  p: (x: Scalar) => boolean,
): boolean {
  if (isScalar(tensor)) {
    return p(tensor)
  } else {
    return tensor.every((e) => tensorEvery(e, p))
  }
}

export function tensorAlmostEqual(
  x: Tensor,
  y: Tensor,
  epsilon: number,
): boolean {
  return tensorEvery(sub(x, y), (x) => Math.abs(scalarReal(x)) <= epsilon)
}

export function assertTensorAlmostEqual(
  x: Tensor,
  y: Tensor,
  epsilon: number,
): void {
  if (!tensorAlmostEqual(x, y, epsilon)) {
    throw new Error(`[assertTensorAlmostEqual] [${x}], [${y}], ${epsilon}`)
  }
}
