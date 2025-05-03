// components/Accordion.tsx
import {
	View,
	Text,
	TouchableOpacity,
	LayoutAnimation,
	Platform,
	UIManager,
} from "react-native"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react-native"

if (
	Platform.OS === "android" &&
	UIManager.setLayoutAnimationEnabledExperimental
) {
	UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default function Accordion({
	title,
	children,
}: {
	title: string
	children: React.ReactNode
}) {
	const [expanded, setExpanded] = useState(false)

	const toggleExpand = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
		setExpanded(!expanded)
	}

	return (
		<View className="mb-4 bg-surface dark:bg-[#1a1a1a] rounded-2xl p-4 shadow">
			<TouchableOpacity
				onPress={toggleExpand}
				className="flex-row justify-between items-center"
			>
				<Text className="text-lg font-semibold text-textPrimary dark:text-white">
					{title}
				</Text>
				{expanded ? (
					<ChevronUp
						size={20}
						color="#888"
					/>
				) : (
					<ChevronDown
						size={20}
						color="#888"
					/>
				)}
			</TouchableOpacity>

			{expanded && <View className="mt-3">{children}</View>}
		</View>
	)
}
