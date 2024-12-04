import {
  gradientStateGetWithDefault,
  gradientStateSet,
  type GradientState,
} from "../gradient/index.ts"
import { type Scalar } from "./Scalar.ts"

export type Link = (
  y: Scalar,
  accumulator: number,
  state: GradientState,
) => GradientState

export function endOfChain(
  d: Scalar,
  z: number,
  state: GradientState,
): GradientState {
  const g = gradientStateGetWithDefault(state, d, 0)
  return gradientStateSet(state, d, z + g)
}
