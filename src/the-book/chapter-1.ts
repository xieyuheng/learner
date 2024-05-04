export function line(x: number): (ps: [number, number]) => number {
  return (ps) => ps[0] * x + ps[1]
}
