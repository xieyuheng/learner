import { modelAccuracy } from "../modelAccuracy.js"
import { irisTestXs, irisTestYs } from "./irisDataset.js"
import { irisModel } from "./irisModel.js"
import { test } from "node:test"

test("irisModel", () => {
  // console.log(irisModel(irisTestXs))
  // console.log(irisTestYs)
  console.log(
    "iris model accuracy:",
    modelAccuracy(irisModel, irisTestXs, irisTestYs),
  )
})
