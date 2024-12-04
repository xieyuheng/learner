import { isScalar, type Scalar } from "./Scalar.ts"

export type Tensor = Scalar | Array<Tensor>

export function isTensor(x: any): x is Tensor {
  return isScalar(x) || (x instanceof Array && x.every(isTensor))
}
