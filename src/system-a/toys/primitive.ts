import {
  Dual,
  isNumber,
  scalarLink,
  scalarReal,
  type Scalar,
} from "../tensor/index.ts"

export function primitive1(
  realFn: (ra: number) => number,
  gradientFn: (ra: number, z: number) => number,
): (da: Scalar) => Scalar {
  return (da) => {
    if (isNumber(da)) {
      return realFn(scalarReal(da))
    } else {
      return Dual(realFn(scalarReal(da)), (_d, z, state) => {
        const ga = gradientFn(scalarReal(da), z)
        return scalarLink(da)(da, ga, state)
      })
    }
  }
}

export function primitive2(
  realFn: (ra: number, rb: number) => number,
  gradientFn: (ra: number, rb: number, z: number) => [number, number],
): (da: Scalar, db: Scalar) => Scalar {
  return (da, db) => {
    if (isNumber(da) && isNumber(db)) {
      return realFn(scalarReal(da), scalarReal(db))
    } else {
      return Dual(realFn(scalarReal(da), scalarReal(db)), (_d, z, state) => {
        const [ga, gb] = gradientFn(scalarReal(da), scalarReal(db), z)
        state = scalarLink(da)(da, ga, state)
        state = scalarLink(db)(db, gb, state)
        return state
      })
    }
  }
}
