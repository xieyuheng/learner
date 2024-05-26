import { zip } from "../../utils/zip.js"
import { assertTensorRankAbove1, rank, type Tensor } from "../tensor/index.js"

export function extend1<A, B extends Tensor>(
  fn: (x: A) => B,
  baseRank: number,
): (x: Tensor) => Tensor {
  return function extendedFn(x: Tensor): Tensor {
    if (rank(x) === baseRank) {
      return fn(x as A)
    }

    assertTensorRankAbove1(x)
    return x.map(extendedFn)
  }
}

export function extend2<A, B extends Tensor>(
  fn: (x: A, y: B) => Tensor,
  firstBaseRank: number,
  secondBaseRank: number,
): (x: Tensor, y: Tensor) => Tensor {
  return function extendedFn(x: Tensor, y: Tensor): Tensor {
    if (rank(x) === firstBaseRank && rank(y) === secondBaseRank) {
      return fn(x as A, y as B)
    }

    if (rank(y) === secondBaseRank) {
      assertTensorRankAbove1(x)
      return x.map((x) => extendedFn(x, y))
    }

    if (rank(x) === firstBaseRank) {
      assertTensorRankAbove1(y)
      return y.map((y) => extendedFn(x, y))
    }

    // NOTE We use `rank` instead of `tlen` here,
    // related issue: https://github.com/themetaschemer/malt/issues/56

    if (rank(x) === rank(y)) {
      assertTensorRankAbove1(x)
      assertTensorRankAbove1(y)
      return zip(x, y).map(([x, y]) => extendedFn(x, y))
    }

    if (rank(x) > rank(y)) {
      assertTensorRankAbove1(x)
      return x.map((x) => extendedFn(x, y))
    }

    if (rank(x) < rank(y)) {
      assertTensorRankAbove1(y)
      return y.map((y) => extendedFn(x, y))
    }

    throw new Error(`[extend2] Unhandled case.`)
  }
}
