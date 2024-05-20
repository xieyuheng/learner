import {
  gradientStateGetWithDefault,
  gradientStateSet,
  type GradientState,
} from "../gradient-descent/index.js"

export type Dual = { "@type": "Dual"; real: number; link: Link }

export function Dual(real: number, link: Link): Dual {
  return { "@type": "Dual", real, link }
}

export function isDual(x: any): x is Dual {
  return x.hasOwnProperty("@type") && x["@type"] === "Dual"
}

export type Scalar = number | Dual

export function isScalar(x: any): x is Scalar {
  return typeof x === "number" || isDual(x)
}

export function assertScalar(t: any): asserts t is Scalar {
  if (!isScalar(t)) {
    throw new Error(`[assertScalar] ${t}`)
  }
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

export function scalarTruncate(x: Scalar): Scalar {
  return Dual(scalarReal(x), endOfChain)
}

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
