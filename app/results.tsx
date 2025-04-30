import { View, Text, TouchableOpacity, SafeAreaView } from "react-native"
import { useEffect, useState } from "react"
import { router, useLocalSearchParams } from "expo-router"
import { CheckCircle, XCircle } from "lucide-react-native"
import { saveScanResult } from "@/utils/HistoryDatabase"
import { v4 as uuidv4 } from "uuid"
import * as Crypto from "expo-crypto" // ✅ HERE at top!

// --- HELPERS ---
async function generateUUID() {
	return Crypto.randomUUID() // ✅ clean UUID generator
}

export default function Results() {
	const { imageUri } = useLocalSearchParams<{ imageUri: string }>()

	const [diagnosis, setDiagnosis] = useState<"Benign" | "Malignant">("Benign")
	const [confidence, setConfidence] = useState<number | undefined>(undefined)

	useEffect(() => {
		if (imageUri === undefined) {
			console.log("🚨 imageUri is undefined, returning early")
			return
		}

		if (!imageUri) {
			console.log("🚨 imageUri is empty, sending back to scan")
			router.replace("/scan")
			return
		}

		console.log("✅ Valid imageUri received:", imageUri)

		const randomResult = Math.random() < 0.8 ? "Benign" : "Malignant"
		const randomConfidence = Math.floor(Math.random() * 20) + 80

		;(async () => {
			try {
				const id = await generateUUID() // ✅ Use it here
				await saveScanResult({
					id,
					imageUri,
					diagnosis: randomResult,
					date: new Date().toISOString(),
					confidence: randomConfidence,
				})

				console.log("✅ Scan saved after analyzing!")
			} catch (error) {
				console.error("🔥 Error during saving scan:", error)
			}
		})()
	}, [imageUri])

	const handleNewScan = () => {
		router.replace("/scan")
	}

	return (
		<SafeAreaView className="flex-1 bg-background justify-center items-center px-6">
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
				className={`text-4xl font-bold text-center mt-8 ${
					diagnosis === "Benign" ? "text-success" : "text-error"
				}`}
			>
				{diagnosis}
			</Text>

			{/* (Optional) Confidence */}
			{confidence !== undefined && (
				<Text className="text-textSecondary text-lg text-center mt-4">
					Confidence: {confidence}%
				</Text>
			)}

			{/* New Scan Button */}
			<TouchableOpacity
				className="bg-accent py-4 px-8 rounded-2xl mt-10"
				onPress={handleNewScan}
			>
				<Text className="text-white text-lg font-bold">Start New Scan</Text>
			</TouchableOpacity>
		</SafeAreaView>
	)
}
