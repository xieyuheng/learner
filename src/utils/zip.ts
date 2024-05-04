export function zip<A, B>(xs: Array<A>, ys: Array<B>): Array<[A, B]> {
  const result: Array<[A, B]> = []
  for (const [i, x] of xs.entries()) {
    const y = ys[i]
    result.push([x, y])
  }

  return result
}
