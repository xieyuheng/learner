import type { Scalar } from "../tensor/index.js"
import { lt } from "./toys.js"

export function rectifyScalar(s: Scalar): Scalar {
  if (lt(s, 0)) {
    return 0
  } else {
    return s
  }
}
