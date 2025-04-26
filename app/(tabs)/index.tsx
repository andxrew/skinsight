// import { ScrollView, Text, View } from "react-native"

// export default function Index() {
// 	return (
// 		<View className="flex-1 bg-background">
// 			<ScrollView
// 				className="flex-1 px-5"
// 				showsVerticalScrollIndicator={false}
// 				contentContainerStyle={{ paddingBottom: 10, minHeight: "100%" }}
// 			>
// 				<Text className="text-5xl text-blue-500">Hello g</Text>
// 				<Text className="text-5xl text-blue-500">Hello g</Text>
// 				<Text className="text-5xl text-blue-500">Hello g</Text>
// 			</ScrollView>
// 		</View>
// 	)
// }

import HomeHeader from "@/components/HomeHeader"
import { ScrollView, Text, View, TouchableOpacity } from "react-native"

export default function Index() {
	return (
		<View className="flex-1 ">
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 20 }}
			>
				{/* Header */}
				<HomeHeader />

				{/* Content Area */}
				<View className="px-5">
					{/* Welcome Message */}
					<Text className="text-3xl font-bold text-accent mb-6 mt-4">
						👋 Welcome back!
					</Text>

					{/* Last Scan Result */}
					<View className="bg-surface rounded-2xl p-5 mb-6 shadow">
						<Text className="text-lg font-semibold text-textPrimary mb-2">
							🩺 Last Scan
						</Text>
						<Text className="text-2xl font-bold text-success">Benign</Text>
						<TouchableOpacity className="mt-3">
							<Text className="text-accent underline">View Full Report</Text>
						</TouchableOpacity>
					</View>

					{/* Quick Stats */}
					<View className="bg-surface rounded-2xl p-5 mb-6 shadow">
						<Text className="text-lg font-semibold text-textPrimary mb-2">
							📊 Your Stats
						</Text>
						<Text className="text-textSecondary">Total Scans: 25</Text>
						<Text className="text-textSecondary">Benign Rate: 92%</Text>
					</View>

					{/* New Scan Button */}
					<TouchableOpacity className="bg-accent py-4 rounded-2xl items-center">
						<Text className="text-white font-bold text-lg">Start New Scan</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	)
}
