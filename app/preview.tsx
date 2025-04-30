import {
	View,
	Text,
	Image,
	TouchableOpacity,
	SafeAreaView,
	ScrollView,
} from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { ArrowLeft, CheckCircle2 } from "lucide-react-native"

export default function Preview() {
	const { imageUri } = useLocalSearchParams<{ imageUri: string }>()

	const handleRetake = () => {
		router.replace("/scan") // ✅ Forcefully go to Scan page
	}

	const handleConfirm = () => {
		router.push({
			pathname: "/analyzing",
			params: { imageUri },
		}) // 🚀 (we'll build this analyzing page next)
	}

	return (
		<SafeAreaView className="flex-1 bg-background">
			<ScrollView>
				{/* Captured Image */}
				<View className="flex-1 items-center justify-center px-5 mt-10">
					{imageUri ? (
						<Image
							source={{ uri: imageUri }}
							className="w-full h-[500px] rounded-2xl mb-6"
							resizeMode="contain"
						/>
					) : (
						<Text className="text-textPrimary">No Image Found</Text>
					)}
				</View>

				{/* Buttons */}
				<View className="flex-row justify-around mb-10 px-6 ">
					{/* Retake Button */}
					<TouchableOpacity
						className="bg-surface py-4 px-6 rounded-full flex-1 mr-2 items-center"
						onPress={handleRetake}
					>
						<ArrowLeft
							color="#4169E1"
							size={28}
						/>
						<Text className="text-textPrimary font-bold text-lg mt-2">
							Retake
						</Text>
					</TouchableOpacity>

					{/* Confirm Button */}
					<TouchableOpacity
						className="bg-accent py-4 px-6 rounded-full flex-1 ml-2 items-center"
						onPress={handleConfirm}
					>
						<CheckCircle2
							color="white"
							size={28}
						/>
						<Text className="text-white font-bold text-lg mt-2">Confirm</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

Preview.options = {
	headerShown: false,
}
