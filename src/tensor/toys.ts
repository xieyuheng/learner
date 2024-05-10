import {
  Dual,
  extend1,
  extend2,
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

const expScalar = prim1(Math.exp, (ra, z) => Math.exp(ra) * z)

const exp = extend1(expScalar)

const addScalar = prim2(
  (x, y) => x + y,
  (_ra, _rb, z) => [z, z],
)

const subScalar = prim2(
  (x, y) => x - y,
  (_ra, _rb, z) => [z, -z],
)

const mulScalar = prim2(
  (x, y) => x * y,
  (ra, rb, z) => [rb * z, ra * z],
)

export const add = extend2(addScalar)
export const sub = extend2(subScalar)
export const mul = extend2(mulScalar)

// export const sqrt = extend1(Math.sqrt)
// export const square = extend1((x) => x * x)

export function sum1(xs: Array<number>): number {
  return xs.reduce((x, result) => x + result, 0)
}

// export function sum(x: Tensor): Tensor {
//   assertNotScalar(x)
//   if (rank(x) === 1) {
//     assertTensor1(x)
//     return sum1(x)
//   }

//   return x.map((x) => sum(x))
// }
