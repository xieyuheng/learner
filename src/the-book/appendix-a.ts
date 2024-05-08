export type Dual = { "@type": "Dual"; real: number; link: any }

export function Dual(real: number, link: any): Dual {
  return { "@type": "Dual", real, link }
}

export function isDual(x: any): x is Dual {
  return x.hasOwnProperty("@type") && x["@type"] === "Dual"
}

export type Scalar = number | Dual

export function isScalar(x: any): x is Scalar {
  return typeof x === "number" && isDual(x)
}
