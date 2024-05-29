export function assertArrayTheSame<A>(
  array: Array<A>,
  eq: (x: A, y: A) => boolean = (x, y) => x === y,
): void {
  if (array.length === 0) return

  let x = array[0]
  let xs = array.slice(1)

  while (xs.length > 0) {
    const y = xs[0]
    if (!eq(x, y)) {
      console.error({ who: "assertArrayTheSame", array })
      throw new Error(`[assertArrayTheSame] Not all the same ${array}`)
    }

    x = y
    xs = xs.slice(1)
  }
}
