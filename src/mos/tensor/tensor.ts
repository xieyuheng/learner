export type Tensor = number | Array<Tensor>

export function shape(t: Tensor): Array<number> {
    if (typeof(t) === "number") {
        return []
    }
    else {
        return [t.length].concat(shape(t[0]))
    }
}

export function rank(t: Tensor): number {
    return ranked(t, 0)
    function ranked(t: Tensor, a: number): number{
        if (typeof(t) === "number") {return a}
        else {return ranked(t[0], a + 1)}
    }
}