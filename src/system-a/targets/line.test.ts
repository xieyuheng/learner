import { gradientDescentLonely } from "../gradient-descent/gradientDescentLonely.js"
import { gradientDescentNaked } from "../gradient-descent/gradientDescentNaked.js"
import { gradientDescentVelocity } from "../gradient-descent/gradientDescentVelocity.js"
import type { GradientDescentFn } from "../gradient-descent/index.js"
import { l2Loss } from "../loss/index.js"
import { assertTensorAlmostEqual } from "../tensor/index.js"
import { samplingObjective } from "../tensor/samplingObjective.js"
import { line } from "./line.js"
import assert from "assert"
import { test } from "node:test"

test("line", () => {
  assert.deepStrictEqual(line(1)(2, 3), 5)
})

test("line -- extended", () => {
  assert.deepStrictEqual(line([1, 2])(2, 3), [5, 7])
})

function testGradientDescentByLine(
  gradientDescentFn: GradientDescentFn,
  options: {
    revs: number
  },
) {
  const xs = [2, 1, 4, 3]
  const ys = [1.8, 1.2, 4.2, 3.3]

  const objective = samplingObjective(l2Loss(line), xs, ys, {
    batchSize: 4,
  })

  const rs = gradientDescentFn(objective, [0, 0], {
    revs: options.revs,
  })

  assertTensorAlmostEqual(rs, [1, 0], 10e-1)
}

test("line -- gradientDescentNaked", () => {
  testGradientDescentByLine(gradientDescentNaked({ learningRate: 0.01 }), {
    revs: 1000,
  })
})

test("line -- gradientDescentLonely", () => {
  testGradientDescentByLine(gradientDescentLonely({ learningRate: 0.01 }), {
    revs: 1000,
  })
})

test("line -- gradientDescentVelocity", () => {
  testGradientDescentByLine(
    gradientDescentVelocity({
      learningRate: 0.01,
      relayFactor: 0.9,
    }),
    {
      revs: 300,
    },
  )
})
