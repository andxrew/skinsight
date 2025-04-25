import { View, Text, ImageBackground, Image } from "react-native"
import React from "react"
import { Tabs } from "expo-router"
import { images } from "@/constants/images"
import { icons } from "@/constants/icons"

const TabIcon = ({ focused, icon, title }: any) => {
	if (focused) {
		return (
			<View
				// source={images.highlight}
				className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
			>
				<Image
					source={icon}
					tintColor="#151312"
					className="size-5"
				/>
				<Text className="text-secondary text-base font-semibold ml-2">
					{title}
				</Text>
			</View>
		)
	}

	return (
		<View className="size-full justify-center items-center mt-4 rounded-full">
			<Image
				source={icon}
				tintColor="#4169E1"
				className="size-5"
			/>
		</View>
	)
}

const _layout = () => {
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
					borderWidth: 1,
					borderColor: "#F0F4FF",
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
							icon={icons.home}
							title="Home"
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
							icon={icons.search}
							title="Search"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="history"
				options={{
					title: "Results",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							icon={icons.home}
							title="Results"
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
							icon={icons.home}
							title="Options"
						/>
					),
				}}
			/>
		</Tabs>
	)
}

export default _layout
