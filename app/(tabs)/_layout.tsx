import { View, Text } from "react-native"
import React from "react"
import { Tabs } from "expo-router"
import { Home, SearchCheck, BookOpenCheck, Settings } from "lucide-react-native"
import { useTheme } from "@/components/ThemeContext"

const TabIcon = ({
	focused,
	Icon,
	label,
}: {
	focused: boolean
	Icon: any
	label: string
}) => {
	const { theme } = useTheme() // access current theme from context

	const iconColor = focused
		? theme === "dark"
			? "#7F9DFF" // focused white in dark mode
			: "#4169E1" // accent in light mode
		: theme === "dark"
		? "#6B7280" // gray-500
		: "#9CA3AF" // gray-400

	return (
		<View className="items-center justify-center mt-2">
			<Icon
				size={24}
				strokeWidth={focused ? 3 : 2}
				color={iconColor}
			/>
		</View>
	)
}

export default function Layout() {
	const { theme } = useTheme() // 👈 used for dynamic tab bar style

	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: theme === "dark" ? "#1A2440" : "#F0F4FF",
					borderRadius: 50,
					borderColor: theme === "dark" ? "#7F9DFF" : "#4169E1",
					marginHorizontal: 20,
					marginBottom: 36,
					height: 52,
					position: "absolute",
					overflow: "hidden",
					borderWidth: 2,
					shadowOpacity: 0,
					borderTopWidth: 2,
				},
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
