import { test } from "node:test"
import { modelAccuracy } from "../modelAccuracy.ts"
import { irisTestXs, irisTestYs } from "./irisDataset.ts"
import { irisModel } from "./irisModel.ts"

test("irisModel", () => {
  // console.log(irisModel(irisTestXs))
  // console.log(irisTestYs)
  console.log(
    "iris model accuracy:",
    modelAccuracy(irisModel, irisTestXs, irisTestYs),
  )
})
