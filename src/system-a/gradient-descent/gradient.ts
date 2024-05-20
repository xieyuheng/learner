import {
  isScalar,
  scalarLink,
  scalarTruncate,
  tensorMap,
  type Scalar,
  type Tensor,
} from "../tensor/index.js"
import {
  emptyGradientState,
  gradientStateGetWithDefault,
  type GradientState,
} from "./GradientState.js"

// The effect of `gradient` on a `DifferentiableFn`
// is `sum` of all elements of it's result tensor.
export type DifferentiableFn =
  | ((...args: Array<Tensor>) => Tensor)
  | ((...args: Array<Scalar>) => Tensor)

export function gradient(fn: DifferentiableFn, args: Array<Tensor>): Tensor {
  const wrt = tensorMap(args, scalarTruncate)
  return gradientOnce(fn(...(wrt as any)), wrt)
}

export function gradientOnce(y: Tensor, wrt: Tensor): Tensor {
  const state = collectGradients(y, emptyGradientState())
  return tensorMap(wrt, (x) => gradientStateGetWithDefault(state, x, 0))
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
