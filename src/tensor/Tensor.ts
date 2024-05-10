import { isScalar, scalarLink, scalarTruncate, type Scalar } from "./index.js"

export type Tensor = Scalar | Array<Tensor>

// The effect of `gradient` on a `DifferentiableFn`
// is `sum` of all elements of it's result tensor.
export type DifferentiableFn =
  | ((...args: Array<Tensor>) => Tensor)
  | ((...args: Array<Scalar>) => Tensor)

export function tensorMap(fn: (x: Scalar) => Scalar, tensor: Tensor): Tensor {
  if (isScalar(tensor)) {
    return fn(tensor)
  } else {
    return tensor.map((e) => tensorMap(fn, e))
  }
}

export function gradient(fn: DifferentiableFn, args: Array<Tensor>): Tensor {
  const wrt = tensorMap(scalarTruncate, args)
  return gradientOnce(fn(...(wrt as any)), wrt)
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
