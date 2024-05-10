import {
  Dual,
  prim1,
  prim2,
  scalarLink,
  scalarReal,
  type Scalar,
} from "./index.js"

export function addScalarByHand(da: Scalar, db: Scalar): Scalar {
  return Dual(scalarReal(da) + scalarReal(db), (_d, z, state) => {
    state = scalarLink(da)(da, 1 * z, state)
    return scalarLink(db)(db, 1 * z, state)
  })
}

export function mulScalarByHand(da: Scalar, db: Scalar): Scalar {
  return Dual(scalarReal(da) * scalarReal(db), (_d, z, state) => {
    state = scalarLink(da)(da, scalarReal(db) * z, state)
    state = scalarLink(db)(db, scalarReal(da) * z, state)
    return state
  })
}

export function expScalarByHand(da: Scalar): Scalar {
  return Dual(Math.exp(scalarReal(da)), (_d, z, state) => {
    return scalarLink(da)(da, Math.exp(scalarReal(da)) * z, state)
  })
}

export const expScalar = prim1(Math.exp, (ra, z) => Math.exp(ra) * z)

export const addScalar = prim2(
  (x, y) => x + y,
  (_ra, _rb, z) => [z, z],
)

export const mulScalar = prim2(
  (x, y) => x * y,
  (ra, rb, z) => [rb * z, ra * z],
)
