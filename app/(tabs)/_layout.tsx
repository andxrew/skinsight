import { View, Text, ImageBackground, Image } from "react-native"
import React from "react"
import { Tabs } from "expo-router"
import { images } from "@/constants/images"
import { icons } from "@/constants/icons"
// import { Home, Camera, LineChart, Settings } from "lucide-react-native"
// import {} from "module"
// import { Home, Camera, Activity, Settings } from "react-native-feather" // feather icons!
import {
	Home,
	Camera,
	LineChart,
	Settings,
	SearchCheck,
	BookOpenCheck,
} from "lucide-react-native"

import { BlurView } from "expo-blur"

const TabIcon = ({
	focused,
	Icon,
	label,
}: {
	focused: boolean
	Icon: any
	label: string
}) => {
	return (
		<View className="items-center justify-center mt-2">
			<Icon
				color={focused ? "#4169E1" : "#9ca3af"}
				size={24}
				strokeWidth={focused ? 3 : 2}
			/>
			{/* Optional: Label under icon */}
			{/* <Text className={`text-xs mt-1 ${focused ? "text-accent" : "text-gray-400"}`}>{label}</Text> */}
		</View>
	)
}

export default function Layout() {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarItemStyle: {
					width: 100,
					height: 100,
					justifyContent: "center",
					alignItems: "center",
				},
				tabBarStyle: {
					backgroundColor: "#F0F4FF",
					borderRadius: 50,
					marginHorizontal: 20,
					marginBottom: 36,
					height: 52,
					position: "absolute",
					overflow: "hidden",
					borderWidth: 0,
					borderColor: "#F0F4FF",
					shadowOpacity: 0.1,
					// shadowColor: "#000",
					// shadowOffset: { width: 0, height: 5 },
					// shadowRadius: 10,
					// elevation: 5,
				},
				// tabBarBackground: () => (
				// 	<BlurView
				// 		intensity={70}
				// 		tint="light" // You can use 'dark' for dark mode
				// 		className="flex-1"
				// 		style={{ borderRadius: 0 }}
				// 	/>
				// ),
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							Icon={Home}
							label="Home"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="scan"
				options={{
					title: "Scan",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							Icon={SearchCheck}
							label="Scan"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="history"
				options={{
					title: "History",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							Icon={BookOpenCheck}
							label="History"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							Icon={Settings}
							label="Settings"
						/>
					),
				}}
			/>
		</Tabs>
	)
}

{
	/* <Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarItemStyle: {
					width: 100,
					height: 100,
					justifyContent: "center",
					alignItems: "center",
				},
				tabBarStyle: {
					backgroundColor: "#F0F4FF",
					borderRadius: 50,
					marginHorizontal: 20,
					marginBottom: 36,
					height: 52,
					position: "absolute",
					overflow: "hidden",
					borderWidth: 1,
					borderColor: "#F0F4FF",
					shadowOpacity: 0,
				},
			}}
		> */
}
