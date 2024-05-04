export type Tensor = number | Array<Tensor>

export function isScalar(t: Tensor): t is number {
  return typeof t === "number"
}

export function assertScalar(t: Tensor): asserts t is number {
  if (!isScalar(t)) {
    throw new Error(`[assertScalar] ${t}`)
  }
}

export function assertNotScalar(t: Tensor): asserts t is Array<Tensor> {
  if (isScalar(t)) {
    throw new Error(`[assertNotScalar] ${t}`)
  }
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
