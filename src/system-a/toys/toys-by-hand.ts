import { Dual, scalarLink, scalarReal, type Scalar } from "../Scalar.js"

function addScalar(da: Scalar, db: Scalar): Scalar {
  return Dual(scalarReal(da) + scalarReal(db), (_d, z, state) => {
    state = scalarLink(da)(da, 1 * z, state)
    return scalarLink(db)(db, 1 * z, state)
  })
}

function mulScalar(da: Scalar, db: Scalar): Scalar {
  return Dual(scalarReal(da) * scalarReal(db), (_d, z, state) => {
    state = scalarLink(da)(da, scalarReal(db) * z, state)
    state = scalarLink(db)(db, scalarReal(da) * z, state)
    return state
  })
}

function expScalar(da: Scalar): Scalar {
  return Dual(Math.exp(scalarReal(da)), (_d, z, state) => {
    return scalarLink(da)(da, Math.exp(scalarReal(da)) * z, state)
  })
}
