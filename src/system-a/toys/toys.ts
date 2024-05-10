import { extend1, extend2 } from "./extend.js"
import { prim1, prim2 } from "./prim.js"

export const expScalar = prim1(Math.exp, (ra, z) => Math.exp(ra) * z)

export const addScalar = prim2(
  (x, y) => x + y,
  (_ra, _rb, z) => [z, z],
)

export const subScalar = prim2(
  (x, y) => x - y,
  (_ra, _rb, z) => [z, -z],
)

export const mulScalar = prim2(
  (x, y) => x * y,
  (ra, rb, z) => [rb * z, ra * z],
)

export const sqrtScalar = prim1(
  (x) => Math.sqrt(x),
  (ra, z) => (1 / 2) * ra ** (-1 / 2) * z,
)

export const exp = extend1(expScalar)
export const add = extend2(addScalar)
export const sub = extend2(subScalar)
export const mul = extend2(mulScalar)
export const sqrt = extend1(sqrtScalar)
