export function line(x: number): (theta: [number, number]) => number {
  return (theta) => x * theta[0] + theta[1]
}
