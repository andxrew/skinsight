import {
	View,
	Text,
	TouchableOpacity,
	Alert,
	SafeAreaView,
	ScrollView,
	Switch,
	Linking,
} from "react-native"
import { clearScanHistory } from "@/utils/HistoryDatabase"
import Constants from "expo-constants"
import { useTheme } from "@/components/ThemeContext" // ✅ correct import

export default function Settings() {
	const { theme, toggleTheme } = useTheme() // ✅ global theme hook
	console.log("🧭 [Settings] Current theme from context:", theme)

	const handleClearHistory = async () => {
		Alert.alert(
			"Clear All History?",
			"This will permanently delete all scan records.",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete All",
					style: "destructive",
					onPress: async () => {
						await clearScanHistory()
						Alert.alert(
							"History Cleared",
							"Your scan history has been deleted."
						)
					},
				},
			]
		)
	}

	const handleContact = () => {
		const email = "yourname@example.com" // Replace with your email
		const subject = "Skinsight Feedback"
		const body =
			"Hi,\n\nI'd like to share some feedback about the Skinsight app...\n"

		const mailtoURL = `mailto:${email}?subject=${encodeURIComponent(
			subject
		)}&body=${encodeURIComponent(body)}`
		Linking.openURL(mailtoURL).catch(() =>
			Alert.alert("Error", "Could not open your mail app.")
		)
	}

	return (
		<SafeAreaView className="flex-1 bg-background dark:bg-black">
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 20 }}
			>
				<View className="px-5 pt-6">
					{/* Page Title */}
					<Text className="text-3xl font-bold text-accent text-center mb-6 dark:text-white">
						Settings
					</Text>

					{/* Dark Mode Card */}
					<View className="bg-surface dark:bg-[#1a1a1a] p-5 rounded-2xl mb-6 shadow flex-row justify-between items-center">
						<Text className="text-base font-semibold text-textPrimary dark:text-white">
							Dark Mode
						</Text>
						<Switch
							value={theme === "dark"}
							onValueChange={toggleTheme}
						/>
					</View>

					{/* Clear History Card */}
					<View className="bg-surface dark:bg-[#1a1a1a] p-5 rounded-2xl mb-6 shadow">
						<Text className="text-lg font-semibold text-textPrimary dark:text-white mb-3">
							🧹 Manage Data
						</Text>
						<TouchableOpacity
							onPress={handleClearHistory}
							className="bg-error px-4 py-3 rounded-xl"
						>
							<Text className="text-textPrimary dark:text-white font-semibold text-center">
								Clear Scan History
							</Text>
						</TouchableOpacity>
					</View>

					{/* Feedback Button */}
					<TouchableOpacity
						onPress={handleContact}
						className="bg-accent rounded-2xl py-4 items-center mb-6"
					>
						<Text className="text-white font-bold text-lg">
							Send Feedback / Contact Us
						</Text>
					</TouchableOpacity>

					{/* About Section */}
					<View className="bg-surface dark:bg-[#1a1a1a] p-5 rounded-2xl shadow">
						<Text className="text-center text-sm text-textSecondary dark:text-gray-400">
							Skinsight v{Constants.expoConfig?.version ?? "1.0.0"}
						</Text>
						<Text className="text-center text-sm text-textSecondary dark:text-gray-400 mt-1">
							Andrew Sodeinde – University Synoptic (Dissertation) Project
						</Text>
						<Text className="text-center text-xs text-textSecondary dark:text-gray-500 mt-2">
							Built with React Native, Flask, and TensorFlow
						</Text>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
