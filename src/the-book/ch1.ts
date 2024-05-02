function line(x: number): (θ: [number, number]) => number {
  return (θ) => θ[0] * x + θ[1]
}

console.log(line(1))
console.log(line(1)([2, 3]))
