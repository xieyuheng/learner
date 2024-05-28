export function repeatApply<A extends Array<any>, B>(
  n: number,
  f: (...args: A) => B,
  args: A,
): Array<B> {
  const results = []
  while (n > 0) {
    results.push(f(...args))
    n--
  }

  return results
}
