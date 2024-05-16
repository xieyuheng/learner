export function refs<A>(array: Array<A>, indexes: Array<number>): Array<A> {
  return indexes.map((index) => array[index])
}
