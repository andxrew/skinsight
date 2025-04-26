import HomeHeader from "@/components/HomeHeader"
import { ScrollView, Text, View, TouchableOpacity } from "react-native"

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

export default function Index() {
	const randomTip =
		skinHealthTips[Math.floor(Math.random() * skinHealthTips.length)]

	return (
		<View className="flex-1 bg-background">
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 20 }}
			>
				{/* Header */}
				<HomeHeader />

				{/* Content Area */}
				<View className="px-5 flex-1">
					{/* Welcome Message */}
					<Text className=" flex-1 text-3xl font-bold text-accent justify-center text-center items-center mb-6 mt-4">
						👋 Welcome back!
					</Text>

					{/* Last Scan Result */}
					<View className="bg-surface rounded-2xl p-5 mb-6 shadow">
						<Text className="text-lg font-semibold text-textPrimary mb-2">
							🩺 Last Scan
						</Text>
						<Text className="text-2xl font-bold text-success">Benign</Text>
						<TouchableOpacity className="mt-3">
							<Text className="text-accent">View Full Report</Text>
						</TouchableOpacity>
					</View>

					{/* Health Tip */}
					<View className="bg-surface p-5 rounded-2xl mb-6 shadow">
						<Text className="text-lg text-center font-bold text-textPrimary mb-2">
							🧠 Skin Health Tip
						</Text>
						<Text className="text-textSecondary text-center">{randomTip}</Text>
					</View>

					{/* Quick Stats */}
					{/* <View className="bg-surface rounded-2xl p-5 mb-6 shadow">
						<Text className="text-lg font-semibold text-textPrimary mb-6">
							📊 Your Stats
						</Text>
						<Text className="text-textSecondary">Total Scans: 25</Text>
						<Text className="text-textSecondary">Benign Rate: 92%</Text>
					</View> */}

					<View className="bg-surface p-5 rounded-2xl mb-6 shadow items-center">
						<Text className="text-lg font-semibold text-textPrimary mb-2">
							⏰ Next Scan Reminder
						</Text>
						<Text className="text-textSecondary text-center">
							Your next recommended scan is in{" "}
							<Text className="text-accent font-bold">5 days</Text>.
						</Text>
					</View>
					{/* New Scan Button */}
					<TouchableOpacity className="bg-accent rounded-2xl py-4 items-center ">
						<Text className="text-white font-bold text-lg">Start New Scan</Text>
					</TouchableOpacity>

					<TouchableOpacity className=" p-5 rounded-2xl items-center mb-6">
						<Text className="text-accent text-base font-semibold">
							Learn more about early skin cancer signs
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	)
}
