import type { Tensor } from "./tensor.js";

export function sum1(t: Array<number>): number {
    return summed(t, t.length-1, 0)
    function summed(t: Array<number>, i: number, a: number): number {
        if (i === 0) {return a + t[0]}
        else {return summed(t, i-1, a + t[i])}
    }
}