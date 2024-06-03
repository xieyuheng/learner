import test from "node:test";
import assert from "node:assert";
import { sum, sum1 } from "../operator.js";

test("mos -- sum1", () => {
    assert.equal(sum1([1, 2, 3, 4, 5, 6]), 21)
})

test ("mos -- sum", () => {
    assert.deepEqual(sum(1), 1)
    assert.deepEqual(sum([1, 2, 3]), 6)
    assert.deepEqual(sum([[1, 2, 3], [4, 5, 6]]), [6, 15])
})