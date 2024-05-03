export type Tenser = number | Array<Tenser>

export function isScalar(t: Tenser): t is number {
  return typeof t === "number"
}

export function shape(t: Tenser): Array<number> {
  const result: Array<number> = []
  while (!isScalar(t)) {
    result.push(t.length)
    t = t[0]
  }

  return result
}

export function rank(t: Tenser): number {
  return shape(t).length
}
