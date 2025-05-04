import HomeHeader from "@/components/HomeHeader"
import { router } from "expo-router"
import { ScrollView, Text, View, TouchableOpacity } from "react-native"
import { useEffect, useState } from "react"
import { loadLatestScan, ScanResult } from "@/utils/HistoryDatabase"
import { useFocusEffect } from "@react-navigation/native"
import { useCallback } from "react"

const skinHealthTips = [
	"Check your moles monthly for changes in size, color, or shape.",
	"Use broad-spectrum sunscreen daily, even when it's cloudy.",
	"Stay hydrated — healthy skin starts from within.",
	"Avoid tanning beds — they significantly increase skin cancer risk.",
	"Wear protective clothing and hats when outdoors.",
	"Apply sunscreen 15 minutes before sun exposure.",
	"See a dermatologist annually for a full skin exam.",
	"Use gentle skincare products to avoid irritating your skin.",
	"Moisturize regularly to maintain your skin barrier.",
	"Perform self-examinations in front of a mirror under good lighting.",
]

const handleNewScan = () => {
	router.replace("/scan")
}

const handleNewEd = () => {
	router.push("/education")
}
export default function Index() {
	const randomTip =
		skinHealthTips[Math.floor(Math.random() * skinHealthTips.length)]

	const [daysUntilNextScan, setDaysUntilNextScan] = useState<number | null>(
		null
	)
	const [lastScan, setLastScan] = useState<ScanResult | null>(null)
	useFocusEffect(
		useCallback(() => {
			const fetchLastScanAndReminder = async () => {
				try {
					const latest = await loadLatestScan()
					setLastScan(latest)

					if (latest) {
						const lastScanDate = new Date(latest.date)
						const now = new Date()
						const diffTime = now.getTime() - lastScanDate.getTime()
						const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
						const daysLeft = 30 - diffDays
						setDaysUntilNextScan(daysLeft > 0 ? daysLeft : 0)
					} else {
						setDaysUntilNextScan(-1)
					}
				} catch (error) {
					console.error("Failed to refresh last scan:", error)
				}
			}

			fetchLastScanAndReminder()
		}, [])
	)

	return (
		<View className="flex-1 bg-background dark:bg-black">
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 20 }}
			>
				{/* Header */}
				<HomeHeader />

				{/* Content Area */}
				<View className="px-5 flex-1 mt-10">
					{/* Welcome Message */}
					{/* <Text className="text-3xl font-bold dark:text-white text-accent text-center mb-6 mt-4">
						Welcome to Skinsight! 👋
					</Text> */}

					{/* Last Scan Result */}
					{lastScan ? (
						<View className="bg-surface dark:bg-[#1a1a1a] rounded-2xl p-5 mb-6 shadow">
							<Text className="text-lg text-center font-semibold text-textPrimary dark:text-white mb-2">
								🩺 Last Scan
							</Text>
							<Text
								className={`text-2xl font-bold text-center ${
									lastScan.diagnosis === "Malignant"
										? "text-red-500"
										: "text-success"
								}`}
							>
								{lastScan.diagnosis}
							</Text>
							<Text className="text-textSecondary dark:text-gray-400 text-center">
								Confidence: {lastScan.confidence ?? "N/A"}%
							</Text>
							<TouchableOpacity
								className="mt-3"
								onPress={() =>
									router.push({
										pathname: "/results",
										params: {
											imageUri: lastScan.imageUri,
											result: lastScan.diagnosis,
											confidence: String(lastScan.confidence ?? 0),
											fromHistory: "true",
										},
									})
								}
							>
								<Text className="text-accent text-center">
									View Full Report
								</Text>
							</TouchableOpacity>
						</View>
					) : (
						<View className="bg-surface dark:bg-[#1a1a1a] rounded-2xl p-5 mb-6 shadow items-center">
							<Text className="text-lg font-semibold text-textPrimary dark:text-white text-center">
								🩺 No scans yet.
							</Text>
							<Text className="text-textSecondary dark:text-gray-400 text-center mt-1">
								Start your first scan to see results here.
							</Text>
						</View>
					)}

					{/* Health Tip */}
					<View className="bg-surface dark:bg-[#1a1a1a] p-5 rounded-2xl mb-6 shadow">
						<Text className="text-lg text-center font-bold text-textPrimary dark:text-white mb-2">
							🧠 Skinsight Health Tip
						</Text>
						<Text className="text-textSecondary dark:text-gray-400 text-center">
							{randomTip}
						</Text>
					</View>

					{/* Next Scan Reminder */}
					{daysUntilNextScan !== null && (
						<View className="bg-surface dark:bg-[#1a1a1a] p-5 rounded-2xl mb-6 shadow items-center">
							<Text className="text-lg font-semibold text-textPrimary dark:text-white mb-2">
								⏰ Next Scan Reminder
							</Text>
							{daysUntilNextScan === -1 ? (
								<Text className="text-textSecondary dark:text-gray-400 text-center">
									You haven't scanned yet. Start your first scan today!
								</Text>
							) : (
								<Text className="text-textSecondary dark:text-gray-400 text-center">
									Your next recommended scan is in{" "}
									<Text className="text-accent font-bold">
										{daysUntilNextScan === 0
											? "today"
											: `${daysUntilNextScan} day(s)`}
									</Text>
									.
								</Text>
							)}
						</View>
					)}

					{/* New Scan Button */}
					<TouchableOpacity
						className="bg-accent rounded-2xl py-4 items-center"
						onPress={handleNewScan}
					>
						<Text className="text-white font-bold text-lg">Start New Scan</Text>
					</TouchableOpacity>

					{/* Learn More Button */}
					<TouchableOpacity className="p-5 rounded-2xl items-center mb-6">
						<Text
							className="text-accent text-base font-semibold"
							onPress={handleNewEd}
						>
							Learn more about early skin cancer signs
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	)
}
