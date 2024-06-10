import type { GradientDescentFn } from "../gradient-descent/gradientDescent.js"
import { gradientDescentLonely } from "../gradient-descent/gradientDescentLonely.js"
import { gradientDescentNaked } from "../gradient-descent/gradientDescentNaked.js"
import { gradientDescentVelocity } from "../gradient-descent/gradientDescentVelocity.js"
import { l2Loss } from "../loss/index.js"
import { assertTensorAlmostEqual } from "../tensor/index.js"
import { samplingObjective } from "../tensor/samplingObjective.js"
import { quad } from "./quad.js"
import assert from "node:assert"
import { test } from "node:test"

test("quad", () => {
  assert.deepStrictEqual(quad(3)(4.5, 2.1, 7.8), 54.6)
})

test("quad -- extended", () => {
  assert.deepStrictEqual(quad([1, 2, 3])(4.5, 2.1, 7.8), [14.4, 30, 54.6])
})

function testGradientDescentByQuad(
  gradientDescentFn: GradientDescentFn,
  options: {
    revs: number
  },
) {
  const xs = [-1, 0, 1, 2, 3]
  const ys = [2.55, 2.1, 4.35, 10.2, 18.25]

  const objective = samplingObjective(l2Loss(quad), xs, ys, {
    batchSize: 4,
  })

  const rs = gradientDescentFn(objective, [0, 0, 0], {
    revs: options.revs,
  })

  assertTensorAlmostEqual(rs, [1.478, 0.99, 2.05], 10e-2)
}

test("quad -- gradientDescentNaked", () => {
  testGradientDescentByQuad(gradientDescentNaked({ learningRate: 0.001 }), {
    revs: 1000,
  })
})

test("quad -- gradientDescentLonely", () => {
  testGradientDescentByQuad(gradientDescentLonely({ learningRate: 0.001 }), {
    revs: 1000,
  })
})

test("quad -- gradientDescentVelocity", () => {
  testGradientDescentByQuad(
    gradientDescentVelocity({
      learningRate: 0.001,
      relayFactor: 0.9,
    }),
    {
      revs: 300,
    },
  )
})
