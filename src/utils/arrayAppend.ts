export function arrayAppend<A>(...arrays: Array<Array<A>>): Array<A> {
  const result: Array<A> = []
  for (const array of arrays) {
    result.push(...array)
  }

  return result
}
