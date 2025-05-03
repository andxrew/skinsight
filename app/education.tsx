import { ScrollView, Text, View, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ArrowLeft } from "lucide-react-native"
import { router } from "expo-router"
import Accordion from "@/components/Accordion"
export default function Education() {
	return (
		<SafeAreaView className="flex-1 bg-background dark:bg-black">
			<ScrollView className="px-5 py-6">
				{/* Header */}
				<View className="relative flex-row items-center mb-6 px-2">
					{/* Back Button - Left */}
					<TouchableOpacity
						onPress={() => router.replace("/")}
						className="z-10"
					>
						<ArrowLeft
							size={28}
							color="#4169E1"
						/>
					</TouchableOpacity>

					{/* Title - Centered Absolutely */}
					<View className="absolute left-0 right-0 items-center">
						<Text className="text-2xl font-bold text-accent dark:text-white">
							Early Skin Cancer Signs
						</Text>
					</View>
				</View>

				<Accordion title="The ABCDEs of Melanoma's">
					<Text className="text-textSecondary dark:text-gray-300 mb-2">
						• <Text className="font-bold">A - Asymmetry:</Text> One half doesn't
						match the other.
					</Text>
					<Text className="text-textSecondary dark:text-gray-300 mb-2">
						• <Text className="font-bold">B - Border:</Text> Irregular, ragged,
						or blurred edges.
					</Text>
					<Text className="text-textSecondary dark:text-gray-300 mb-2">
						• <Text className="font-bold">C - Color:</Text> Varies in color —
						shades of brown, black, or sometimes patches of pink, red, white.
					</Text>
					<Text className="text-textSecondary dark:text-gray-300 mb-2">
						• <Text className="font-bold">D - Diameter:</Text> Larger than 6mm
						(about the size of a pencil eraser).
					</Text>
					<Text className="text-textSecondary dark:text-gray-300 mb-2">
						• <Text className="font-bold">E - Evolving:</Text> Changing in size,
						shape, or color.
					</Text>
				</Accordion>

				<Accordion title="Other Important Signs">
					<Text className="text-textSecondary dark:text-gray-300 mb-2">
						• New moles or growths on adult skin
					</Text>
					<Text className="text-textSecondary dark:text-gray-300 mb-2">
						• Sores that don’t heal
					</Text>
					<Text className="text-textSecondary dark:text-gray-300">
						• Itching, bleeding, or crusting growths
					</Text>
				</Accordion>

				<Accordion title="Common Types of Skin Cancer">
					<Text className="text-textSecondary dark:text-gray-300 mb-2">
						• <Text className="font-bold">Basal Cell Carcinoma:</Text> Most
						common, grows slowly, rarely spreads.
					</Text>
					<Text className="text-textSecondary dark:text-gray-300 mb-2">
						• <Text className="font-bold">Squamous Cell Carcinoma:</Text> May
						spread if untreated; often appears as scaly red patches.
					</Text>
					<Text className="text-textSecondary dark:text-gray-300 mb-2">
						• <Text className="font-bold">Melanoma:</Text> Less common but more
						dangerous; can spread quickly.
					</Text>
					<Text className="text-textSecondary dark:text-gray-300">
						• <Text className="font-bold">Actinic Keratosis:</Text> Precancerous
						lesions from sun damage.
					</Text>
				</Accordion>

				<Accordion title="Prevention Tips">
					<Text className="text-textSecondary dark:text-gray-300 mb-2">
						• Apply SPF 30+ sunscreen every day, even on cloudy days.
					</Text>
					<Text className="text-textSecondary dark:text-gray-300 mb-2">
						• Avoid peak sun hours (10 AM – 4 PM).
					</Text>
					<Text className="text-textSecondary dark:text-gray-300 mb-2">
						• Wear protective clothing, hats, and UV-blocking sunglasses.
					</Text>
					<Text className="text-textSecondary dark:text-gray-300">
						• Never use tanning beds.
					</Text>
				</Accordion>

				<Accordion title="Who’s at Higher Risk?">
					<Text className="text-textSecondary dark:text-gray-300 mb-2">
						• Fair-skinned individuals or those who burn easily
					</Text>
					<Text className="text-textSecondary dark:text-gray-300 mb-2">
						• People with many moles or freckles
					</Text>
					<Text className="text-textSecondary dark:text-gray-300 mb-2">
						• Personal or family history of skin cancer
					</Text>
					<Text className="text-textSecondary dark:text-gray-300">
						• Those with prolonged UV exposure
					</Text>
				</Accordion>

				{/* Call to Action */}
				<Text className="text-base text-center text-gray-500 dark:text-gray-400 mt-10">
					If you notice any suspicious signs, consult a dermatologist promptly.
				</Text>
			</ScrollView>
		</SafeAreaView>
	)
}
