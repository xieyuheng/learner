import { comparator } from "./comparator.js"
import { extend1, extend2 } from "./extend.js"
import { primitive1, primitive2 } from "./primitive.js"

export const expScalar = primitive1(Math.exp, (ra, z) => Math.exp(ra) * z)

export const addScalar = primitive2(
  (x, y) => x + y,
  (_ra, _rb, z) => [z, z],
)

export const subScalar = primitive2(
  (x, y) => x - y,
  (_ra, _rb, z) => [z, -z],
)

export const mulScalar = primitive2(
  (x, y) => x * y,
  (ra, rb, z) => [rb * z, ra * z],
)

export const divScalar = primitive2(
  (x, y) => x / y,
  (ra, rb, z) => [(1 / rb) * z, ((-1 * ra) / (rb * rb)) * z],
)

export const logScalar = primitive1(
  (x) => Math.log(x),
  (ra, z) => (1 / ra) * z,
)

export const exptScalar = primitive2(
  (x, y) => x ** y,
  (ra, rb, z) => [rb * ra ** (rb - 1) * z, ra ** rb * Math.log(ra) * z],
)

export const squareRootScalar = primitive1(
  (x) => Math.sqrt(x),
  (ra, z) => (1 / 2) * ra ** (-1 / 2) * z,
)

export const squareScalar = primitive1(
  (x) => x * x,
  (ra, z) => 2 * ra * z,
)

export const exp = extend1(expScalar, 0)
export const add = extend2(addScalar)
export const sub = extend2(subScalar)
export const mul = extend2(mulScalar)
export const div = extend2(divScalar)
export const log = extend1(logScalar, 0)
export const expt = extend2(exptScalar)
export const squareRoot = extend1(squareRootScalar, 0)
export const square = extend1(squareScalar, 0)

export const lt = comparator((x, y) => x < y)
export const gt = comparator((x, y) => x > y)
export const lteq = comparator((x, y) => x <= y)
export const gteq = comparator((x, y) => x >= y)
export const eq = comparator((x, y) => x === y)
