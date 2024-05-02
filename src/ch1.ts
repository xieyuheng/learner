function line(x: number): (w: number, b: number) => number {
  return (w, b) => w * x + b;
}

console.log(line(1));
console.log(line(1)(2, 3));
