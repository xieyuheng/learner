export type Link = any
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

export function endOfChain(): any {
  //
}

export type Tensor = Scalar | Array<Tensor>

export type DifferentiableFn = <Parameters extends Tensor>(
  ps: Parameters,
) => number

export function tensorMap(fn: (x: Scalar) => Scalar, tensor: Tensor): Tensor {
  if (isScalar(tensor)) {
    return fn(tensor)
  } else {
    return tensor.map(e => tensorMap(fn, e))
  }
}
