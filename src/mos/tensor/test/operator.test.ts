import test from "node:test";
import assert from "node:assert";
import { sum1 } from "../operator.js";

test("mos -- sum1", () => {
    assert.equal(sum1([1, 2, 3, 4, 5, 6]), 21)
})