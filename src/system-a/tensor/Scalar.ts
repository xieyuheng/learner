import { endOfChain, type Link } from "./Link.js"

export type Dual = { "@type": "Dual"; real: number; link: Link }

export function Dual(real: number, link: Link): Dual {
  return { "@type": "Dual", real, link }
}

export function isDual(x: any): x is Dual {
  return x.hasOwnProperty("@type") && x["@type"] === "Dual"
}

export function isNumber(x: any): x is Number {
  return typeof x === "number"
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

export function scalarTruncate(x: Scalar): Scalar {
  return Dual(scalarReal(x), endOfChain)
}
