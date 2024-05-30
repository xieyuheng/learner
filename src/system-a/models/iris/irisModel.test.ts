import { test } from "node:test"
import { irisTestXs, irisTestYs } from "./irisDataset.js"
import { irisModel } from "./irisModel.js"

test("irisModel", () => {
  console.log(irisModel(irisTestXs))
  console.log(irisTestYs)
})
