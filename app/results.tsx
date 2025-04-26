import { View, Text, TouchableOpacity, SafeAreaView } from "react-native"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { CheckCircle, XCircle } from "lucide-react-native"

export default function Results() {
	const [diagnosis, setDiagnosis] = useState<"Benign" | "Malignant">("Benign")

	useEffect(() => {
		// OPTIONAL: Randomly choose result (simulate ML prediction)
		const randomResult = Math.random() < 0.8 ? "Benign" : "Malignant" // 80% chance benign
		setDiagnosis(randomResult as "Benign" | "Malignant")
	}, [])

	const handleNewScan = () => {
		router.replace("/scan") // Restart a new scan
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
			<Text className="text-textSecondary text-lg text-center mt-4">
				Confidence: 92%
			</Text>

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
