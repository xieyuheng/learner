export function repeatApply<A, B>(n: number, f: (x: A) => B, x: A): Array<B> {
  const results = []
  while (n > 0) {
    results.push(f(x))
    n--
  }

  return results
}
