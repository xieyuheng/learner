export function revise<T>(step: (target: T) => T, revs: number, target: T): T {
  while (revs > 0) {
    target = step(target)
    revs--
  }

  return target
}
