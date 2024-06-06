export type Tensor = number | Array<Tensor>

export type Scalar = number

export function isScalar(t: Tensor): t is number {
  return typeof t === "number"
}

export function isTensor1(t: Tensor): t is Array<number> {
  return rank(t) == 1
}

export function assertScalar(t: Tensor): asserts t is number {
  if (!isScalar(t)) {
    throw new Error(`[assertScalar] ${t}`)
  }
}

export function assertTensor1(t: Tensor): asserts t is Array<number> {
  if (!isTensor1(t)) {
    throw new Error(`[assertTensor1] ${t}`)
  }
}

export function shape(t: Tensor): Array<number> {
  if (isScalar(t)) {
    return []
  } else {
    return [t.length].concat(shape(t[0]))
  }
}

export function rank(t: Tensor): number {
  return ranked(t, 0)
  function ranked(t: Tensor, a: number): number {
    if (isScalar(t)) {
      return a
    } else {
      return ranked(t[0], a + 1)
    }
  }
}
