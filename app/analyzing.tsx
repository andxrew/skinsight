import { View, Text, ActivityIndicator, SafeAreaView } from "react-native"
import { useEffect, useState } from "react"
import { useLocalSearchParams, router } from "expo-router"

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
		// Pick a random funny message
		const randomMessage = messages[Math.floor(Math.random() * messages.length)]
		setFunnyMessage(randomMessage)

		// Randomize analyzing time (between 2-5 seconds)
		const randomDelay = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000

		const timeout = setTimeout(() => {
			router.replace({
				pathname: "/results",
				params: { imageUri },
			})
		}, randomDelay)

		return () => clearTimeout(timeout)
	}, [])

	return (
		<SafeAreaView className="flex-1 bg-background justify-center items-center px-6">
			{/* Spinner */}
			<ActivityIndicator
				size="large"
				color="#4169E1"
			/>

			{/* Main Analyzing Text */}
			<Text className="text-accent text-2xl font-bold text-center mt-6">
				Analyzing your scan...
			</Text>

			{/* Funny Message */}
			<Text className="text-textSecondary text-center mt-4">
				{funnyMessage}
			</Text>
		</SafeAreaView>
	)
}

// ✅ Hide header from this screen (already handled in _layout.tsx)
