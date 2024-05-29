export function arrayEqual<A>(
  xs: Array<A>,
  ys: Array<A>,
  eq: (x: A, y: A) => boolean = (x, y) => x === y,
): boolean {
  if (xs.length !== ys.length) return false

  for (const [i, x] of xs.entries()) {
    const y = ys[i]
    if (!eq(x, y)) {
      return false
    }
  }

  return true
}
