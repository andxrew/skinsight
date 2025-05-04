// import * as tf from "@tensorflow/tfjs"
// import "@tensorflow/tfjs-react-native"
// import { bundleResourceIO } from "@tensorflow/tfjs-react-native"

// let model: tf.LayersModel | null = null

// export async function loadModel() {
// 	if (model) return model // prevent re-loading

// 	await tf.ready()

// 	const modelJson = require("./model/model.json")
// 	const modelWeights = [require("./model/group1-shard1of1.bin")]

// 	model = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights))
// 	console.log("✅ Model loaded")
// 	return model
// }
