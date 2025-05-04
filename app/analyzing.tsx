import {
	View,
	Text,
	ActivityIndicator,
	SafeAreaView,
	Alert,
} from "react-native"
import { useEffect, useState } from "react"
import { useLocalSearchParams, router } from "expo-router"
import * as FileSystem from "expo-file-system"

export default function Analyzing() {
	const [funnyMessage, setFunnyMessage] = useState<string>("")
	const { imageUri } = useLocalSearchParams<{ imageUri: string }>()

	const messages = [
		"Analyzing pixels...",
		"Consulting dermatology textbooks...",
		"Summoning the AI wizards 🧙‍♂️...",
		"Making sure it's not a pizza 🍕...",
		"Double-checking with Skinsight HQ...",
		"Asking a dermatologist's pet cat 🐱...",
		"Checking for freckles and fun!",
		"Almost there... hold tight!",
	]

	useEffect(() => {
		// Pck from messafes array
		const randomMessage = messages[Math.floor(Math.random() * messages.length)]
		setFunnyMessage(randomMessage)

		analyzeImage()
	}, [])

	const analyzeImage = async () => {
		try {
			// Read the image as base64
			const base64Image = await FileSystem.readAsStringAsync(imageUri, {
				encoding: FileSystem.EncodingType.Base64,
			})

			// Send image to backend API
			const response = await fetch("http://192.168.0.33:5000/predict", {
				//  Replace with your local IPv4 address

				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ image: base64Image }),
			})

			const result = await response.json()

			if (result.error) {
				throw new Error(result.error)
			}

			// Navigate to results page with prediction and confidence
			router.replace({
				pathname: "/results",
				params: {
					imageUri,
					result: result.result,
					confidence: result.confidence.toFixed(2),
				},
			})
		} catch (error) {
			console.error("Prediction failed:", error)
			Alert.alert(
				"Prediction Error",
				"Something went wrong while analyzing the image."
			)
		}
	}

	return (
		<SafeAreaView className="flex-1 bg-background dark:bg-black justify-center items-center px-6">
			<ActivityIndicator
				size="large"
				color="#4169E1"
			/>

			<Text className="text-accent text-2xl font-bold text-center mt-6">
				Analyzing your scan...
			</Text>

			<Text className="text-textSecondary dark:text-gray-400 text-center mt-4">
				{funnyMessage}
			</Text>
		</SafeAreaView>
	)
}
