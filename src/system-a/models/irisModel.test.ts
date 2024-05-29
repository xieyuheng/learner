import { test } from "node:test"
import { irisTestXs, irisTestYs } from "./irisDataset.js"
import { irisModel } from "./irisModel.js"

test("irisModel", () => {
  console.log(irisTestXs.map(irisModel))
  console.log(irisTestYs)
})
