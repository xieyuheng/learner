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
