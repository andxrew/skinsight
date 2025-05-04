import { View, Text, TouchableOpacity, SafeAreaView, Image } from "react-native"
import { useEffect, useState } from "react"
import { router, useLocalSearchParams } from "expo-router"
import { CheckCircle, XCircle } from "lucide-react-native"
import { saveScanResult } from "@/utils/HistoryDatabase"
import * as Crypto from "expo-crypto"
import AsyncStorage from "@react-native-async-storage/async-storage"

async function generateUUID() {
	return Crypto.randomUUID()
}

export default function Results() {
	const { imageUri, result, confidence, fromHistory } = useLocalSearchParams<{
		imageUri: string
		result: string
		confidence: string
		fromHistory?: string
	}>()

	const [diagnosis, setDiagnosis] = useState<"Benign" | "Malignant">("Benign")

	useEffect(() => {
		if (!imageUri || !result || !confidence) {
			console.log("🚨 Missing params, sending back to scan")
			router.replace("/scan")
			return
		}

		const formattedResult =
			result.charAt(0).toUpperCase() + result.slice(1).toLowerCase()

		if (formattedResult !== "Benign" && formattedResult !== "Malignant") {
			console.error("🔥 Invalid diagnosis result:", result)
			return
		}

		setDiagnosis(formattedResult as "Benign" | "Malignant")

		// Only save if not coming from history
		if (fromHistory !== "true") {
			;(async () => {
				try {
					const id = await generateUUID()
					await saveScanResult({
						id,
						imageUri,
						diagnosis: formattedResult as "Benign" | "Malignant",
						confidence: parseFloat(confidence),
						date: new Date().toISOString(),
					})
					console.log("✅ Scan saved successfully!")
				} catch (error) {
					console.error("🔥 Failed to save scan:", error)
				}
			})()
		}
	}, [imageUri, result, confidence, fromHistory])
	const handleNewScan = () => {
		router.replace("/scan")
	}

	return (
		<SafeAreaView className="flex-1 bg-background dark:bg-black justify-center items-center px-6">
			{/* Scanned Image */}
			<Image
				source={{ uri: imageUri }}
				className="w-64 h-64 rounded-2xl mb-6"
				resizeMode="cover"
			/>

			{/* Diagnosis Icon */}
			{diagnosis === "Benign" ? (
				<CheckCircle
					size={128}
					color="#16A34A"
				/>
			) : (
				<XCircle
					size={128}
					color="#DC2626"
				/>
			)}

			{/* Diagnosis Text */}
			<Text
				className={`text-4xl font-bold text-center mt-6 ${
					diagnosis === "Benign" ? "text-success" : "text-error"
				}`}
			>
				{diagnosis}
			</Text>

			{/* Confidence */}
			<Text className="text-textSecondary dark:text-gray-400 text-lg text-center mt-4">
				Confidence: {parseFloat(confidence).toFixed(2)}%
			</Text>

			{/* New Scan Button */}
			<TouchableOpacity
				className="bg-accent py-4 px-8 rounded-2xl mt-10"
				onPress={handleNewScan}
			>
				<Text className="text-white text-lg font-bold">Start New Scan</Text>
			</TouchableOpacity>

			{/* View History Button */}
			<TouchableOpacity
				className="mt-4 py-4 px-8 rounded-2xl border-2 border-accent"
				onPress={() => router.push("/history")}
			>
				<Text className="text-accent text-lg font-bold">View History</Text>
			</TouchableOpacity>
		</SafeAreaView>
	)
}
