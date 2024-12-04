import { type Scalar } from "../tensor/index.ts"

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
