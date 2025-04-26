// import { View, Text, Image, TextInput, TouchableOpacity } from "react-native"

// export default function HomeHeader() {
// 	return (
// 		<View className="bg-accent rounded-2xl mx-5 mt-5 p-5">
// 			{/* Top Row: Date + Notification */}
// 			<View className="flex-row justify-between items-center mb-4">
// 				<Text className="text-white opacity-80">Tue, 25 Jan 2025</Text>
// 				<TouchableOpacity className="relative">
// 					<View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 items-center justify-center">
// 						<Text className="text-white text-[10px] font-bold">7</Text>
// 					</View>
// 					{/* Bell Icon Placeholder */}
// 					<Text className="text-white text-xl">🔔</Text>
// 				</TouchableOpacity>
// 			</View>

// 			{/* Profile Row */}
// 			<View className="flex-row items-center mb-4">
// 				<Image
// 					source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }} // Replace later
// 					className="w-14 h-14 rounded-full mr-4"
// 				/>
// 				<View>
// 					<Text className="text-white text-xl font-bold flex-row">
// 						Hi, Dekomori! 👋
// 					</Text>
// 					<View className="flex-row items-center mt-1">
// 						<Text className="text-blue-300 text-sm mr-2">+ 88%</Text>
// 						<Text className="text-yellow-300 text-sm">⭐ Pro Member</Text>
// 					</View>
// 				</View>
// 			</View>

// 			{/* Search Bar */}
// 			<View className="bg-white flex-row items-center px-4 py-3 rounded-full">
// 				<Text className="text-gray-400 mr-2">🔍</Text>
// 				<TextInput
// 					placeholder="Search Skinsight..."
// 					placeholderTextColor="#6B7280"
// 					className="flex-1 text-textPrimary"
// 				/>
// 			</View>
// 		</View>
// 	)
// }

// import React from "react"
// import {
// 	View,
// 	Text,
// 	Image,
// 	TouchableOpacity,
// 	TextInput,
// 	SafeAreaView,
// 	Platform,
// } from "react-native"
// import {
// 	MagnifyingGlassIcon,
// 	BellIcon,
// 	ChevronRightIcon,
// } from "react-native-heroicons/outline"
// import { StarIcon } from "react-native-heroicons/solid"

import {
	View,
	Text,
	TextInput,
	SafeAreaView,
	TouchableOpacity,
} from "react-native"

import { Bell, Search } from "lucide-react-native" // ✅ Import Lucide icons

const HomeHeader = () => {
	const today = new Date()
	const options: Intl.DateTimeFormatOptions = {
		weekday: "short",
		day: "numeric",
		month: "short",
		year: "numeric",
	}
	const formattedDate = today.toLocaleDateString("en-US", options)

	return (
		<View className="bg-accent w-full h-64 rounded-b-3xl pt-20 px-5">
			<SafeAreaView className="flex-1">
				{/* Date and Notification */}
				<View className="flex-row justify-between items-center mb-4">
					<Text className="text-white text-lg">{formattedDate}</Text>
					{/* Notification Icon with Badge */}
					<TouchableOpacity className="relative">
						<View className="bg-accentSoft rounded-full p-2">
							<Bell
								color="white"
								size={28}
								strokeWidth={2}
							/>

							{/* Notification Badge */}
							<View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 items-center justify-center">
								<Text className="text-white text-[10px] font-bold">3</Text>
							</View>
						</View>
					</TouchableOpacity>
				</View>

				{/* Greeting */}
				<View className="flex-row items-center">
					{/* Optional Profile Picture */}
					{/* 
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
              className="w-12 h-12 rounded-full mr-3"
            /> 
            */}
					<View>
						<Text className="text-white text-2xl font-semibold">
							Hi, User! 👋
						</Text>
					</View>
				</View>

				{/* Search Bar */}
				<View className="flex-row items-center bg-accentSoft rounded-full px-4 py-2 mt-4">
					<Search
						color="#F0F4FF"
						size={20}
						strokeWidth={2}
					/>
					<TextInput
						placeholder="Search Skinsight..."
						placeholderTextColor="#F0F4FF"
						className="flex-1 text-white text-base ml-2"
					/>
				</View>
			</SafeAreaView>
		</View>
	)
}

export default HomeHeader
