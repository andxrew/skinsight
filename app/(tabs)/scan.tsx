import { useRef, useState } from "react"
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	ScrollView,
	Alert,
} from "react-native"
import { CameraView, CameraType, useCameraPermissions } from "expo-camera"
import * as ImagePicker from "expo-image-picker"
import { router } from "expo-router"
import {
	RotateCcw,
	Camera as CameraIcon,
	Flashlight,
	Image as ImageIcon,
} from "lucide-react-native"

export default function Scan() {
	const [facing, setFacing] = useState<CameraType>("back")
	const [flashOn, setFlashOn] = useState(false)
	const [permission, requestPermission] = useCameraPermissions()
	const ref = useRef<CameraView>(null)

	const toggleCameraFacing = () => {
		setFacing((current) => (current === "back" ? "front" : "back"))
	}

	const handleCapture = async () => {
		const photo = await ref.current?.takePictureAsync()
		if (photo?.uri) {
			console.log("Captured photo URI:", photo.uri)
			router.push({
				pathname: "/preview",
				params: { imageUri: photo.uri },
			})
		}
	}

	const handleImageUpload = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			base64: false,
			allowsEditing: true,
			quality: 1,
		})

		if (!result.canceled && result.assets[0]?.uri) {
			console.log("Selected image:", result.assets[0].uri)
			router.push({
				pathname: "/preview",
				params: { imageUri: result.assets[0].uri },
			})
		} else if (result.canceled) {
			console.log("Image selection canceled")
		} else {
			Alert.alert("Error", "Failed to pick image.")
		}
	}

	if (!permission) return <View />
	if (!permission.granted) {
		return (
			<SafeAreaView className="flex-1 justify-center items-center bg-background">
				<Text className="text-textPrimary mb-4">
					We need camera permission to continue.
				</Text>
				<TouchableOpacity
					className="bg-accent px-6 py-3 rounded-full"
					onPress={requestPermission}
				>
					<Text className="text-white font-bold text-lg">Grant Permission</Text>
				</TouchableOpacity>
			</SafeAreaView>
		)
	}

	return (
		<SafeAreaView className="flex-1 bg-background">
			<ScrollView
				className="flex-1"
				contentContainerStyle={{ paddingBottom: 20 }}
				showsVerticalScrollIndicator={false}
			>
				{/* Title */}
				<View className="px-5 pt-8">
					<Text className="text-3xl font-bold text-accent text-center mb-6">
						Scan a Skin Lesion
					</Text>
				</View>

				{/* Camera View */}
				<View className="h-[450px] overflow-hidden rounded-3xl mx-5 mb-6">
					<CameraView
						ref={ref}
						facing={facing}
						mode="picture"
						enableTorch={flashOn}
						style={{ flex: 1 }}
						responsiveOrientationWhenOrientationLocked
					>
						{/* Overlay buttons */}
						<View className="absolute bottom-6 w-full flex-row justify-around items-center px-8">
							{/* Flip Camera */}
							<TouchableOpacity
								className="bg-white/30 p-4 rounded-full"
								onPress={toggleCameraFacing}
							>
								<RotateCcw
									color="white"
									size={28}
								/>
							</TouchableOpacity>

							{/* Capture Button */}
							<TouchableOpacity
								className="bg-accent p-6 rounded-full"
								onPress={handleCapture}
							>
								<CameraIcon
									color="white"
									size={32}
								/>
							</TouchableOpacity>

							{/* Flashlight Toggle */}
							<TouchableOpacity
								className={`p-4 rounded-full ${
									flashOn ? "bg-yellow-400/40" : "bg-white/30"
								}`}
								onPress={() => setFlashOn(!flashOn)}
							>
								<Flashlight
									color="white"
									size={28}
								/>
							</TouchableOpacity>
						</View>
					</CameraView>
				</View>

				{/* Upload Button */}
				<View className="items-center mb-6">
					<TouchableOpacity
						onPress={handleImageUpload}
						className="flex-row items-center gap-2 bg-accent px-6 py-4 rounded-2xl"
					>
						<ImageIcon
							color="white"
							size={24}
						/>
						<Text className="text-white text-lg font-bold">
							Upload from Gallery
						</Text>
					</TouchableOpacity>
				</View>

				{/* Scan Tips */}
				<View className="px-5 mb-6">
					<Text className="text-textPrimary text-center font-semibold mb-2">
						📋 Tips for Best Scan:
					</Text>
					<Text className="text-textSecondary text-center">
						- Use good lighting
					</Text>
					<Text className="text-textSecondary text-center">
						- Get a clear, close-up photo
					</Text>
					<Text className="text-textSecondary text-center">
						- Avoid makeup or filters
					</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
