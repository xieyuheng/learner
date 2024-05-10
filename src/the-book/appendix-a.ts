export type Dual = { "@type": "Dual"; real: number; link: Link }

export function Dual(real: number, link: Link): Dual {
  return { "@type": "Dual", real, link }
}

export function isDual(x: any): x is Dual {
  return x.hasOwnProperty("@type") && x["@type"] === "Dual"
}

export function assertDual(x: any): asserts x is Dual {
  if (!isDual(x)) {
    throw new Error(`[assertDual] ${x}`)
  }
}

export type Scalar = number | Dual

export function isScalar(x: any): x is Scalar {
  return typeof x === "number" || isDual(x)
}

export function scalarReal(x: Scalar): number {
  if (isDual(x)) {
    return x.real
  } else {
    return x
  }
}

export function scalarLink(x: Scalar): Link {
  if (isDual(x)) {
    return x.link
  } else {
    return endOfChain
  }
}

export type Tensor = Scalar | Array<Tensor>

// The effect of `gradient` on a `DifferentiableFn`
// is `sum` of all elements of it's result tensor.
export type DifferentiableFn = (x: Tensor) => Tensor

export function tensorMap(fn: (x: Scalar) => Scalar, tensor: Tensor): Tensor {
  if (isScalar(tensor)) {
    return fn(tensor)
  } else {
    return tensor.map((e) => tensorMap(fn, e))
  }
}

export function scalarTruncate(x: Scalar): Scalar {
  return Dual(scalarReal(x), endOfChain)
}

export function gradient(fn: DifferentiableFn, x: Tensor): Tensor {
  const wrt = tensorMap(scalarTruncate, x)
  return gradientOnce(fn(wrt), wrt)
}

export type GradientState = Map<Scalar, number>

export function emptyGradientState(): GradientState {
  return new Map()
}

export function gradientStateGetWithDefault(
  state: GradientState,
  x: Scalar,
  defaultValue: number,
): number {
  return state.get(x) || defaultValue
}

export function gradientStateSet(
  state: GradientState,
  x: Scalar,
  value: number,
): GradientState {
  const newState = new Map([...state])
  newState.set(x, value)
  return newState
}

export function gradientOnce(y: Tensor, wrt: Tensor): Tensor {
  const state = collectGradients(y, emptyGradientState())
  return tensorMap((x) => gradientStateGetWithDefault(state, x, 0), wrt)
}

export type Link = (
  y: Scalar,
  accumulator: number,
  state: GradientState,
) => GradientState

export function collectGradients(
  y: Tensor,
  state: GradientState,
): GradientState {
  if (isScalar(y)) {
    return scalarLink(y)(y, 1, state)
  } else {
    return collectGradientsForArray(y, state)
  }
}

export function collectGradientsForArray(
  ys: Array<Tensor>,
  state: GradientState,
): GradientState {
  for (const y of ys) {
    state = collectGradients(y, state)
  }

  return state
}

export function endOfChain(
  d: Scalar,
  z: number,
  state: GradientState,
): GradientState {
  const g = gradientStateGetWithDefault(state, d, 0)
  return gradientStateSet(state, d, z + g)
}

export function addScalarByHand(da: Scalar, db: Scalar): Scalar {
  return Dual(scalarReal(da) + scalarReal(db), (_d, z, state) => {
    state = scalarLink(da)(da, 1 * z, state)
    return scalarLink(db)(db, 1 * z, state)
  })
}

export function mulScalarByHand(da: Scalar, db: Scalar): Scalar {
  return Dual(scalarReal(da) * scalarReal(db), (_d, z, state) => {
    state = scalarLink(da)(da, scalarReal(db) * z, state)
    state = scalarLink(db)(db, scalarReal(da) * z, state)
    return state
  })
}

export function expScalarByHand(da: Scalar): Scalar {
  return Dual(Math.exp(scalarReal(da)), (_d, z, state) => {
    return scalarLink(da)(da, Math.exp(scalarReal(da)) * z, state)
  })
}

export function prim1(
  realFn: (ra: number) => number,
  gradientFn: (ra: number, z: number) => number,
): (da: Scalar) => Scalar {
  return (da) => {
    return Dual(realFn(scalarReal(da)), (_d, z, state) => {
      const ga = gradientFn(scalarReal(da), z)
      return scalarLink(da)(da, ga, state)
    })
  }
}

export const expScalar = prim1(Math.exp, (ra, z) => Math.exp(ra) * z)

export function prim2(
  realFn: (ra: number, rb: number) => number,
  gradientFn: (ra: number, rb: number, z: number) => [number, number],
): (da: Scalar, db: Scalar) => Scalar {
  return (da, db) => {
    return Dual(realFn(scalarReal(da), scalarReal(db)), (_d, z, state) => {
      const [ga, gb] = gradientFn(scalarReal(da), scalarReal(db), z)
      state = scalarLink(da)(da, ga, state)
      state = scalarLink(da)(da, gb, state)
      return state
    })
  }
}

export const addScalar = prim2(
  (x, y) => x + y,
  (_ra, _rb, z) => [z, z],
)
