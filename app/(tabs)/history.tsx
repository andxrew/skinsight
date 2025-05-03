import React, { useState, useEffect, useCallback } from "react"
import {
	View,
	Text,
	Image,
	TextInput,
	TouchableOpacity,
	FlatList,
} from "react-native"
import { loadScanHistory, ScanResult } from "@/utils/HistoryDatabase"
import { router, useFocusEffect } from "expo-router"

export default function History() {
	const [history, setHistory] = useState<ScanResult[]>([])
	const [tags, setTags] = useState<Record<string, string[]>>({})
	const [newTags, setNewTags] = useState<Record<string, string>>({})

	const fetchHistory = async () => {
		try {
			const scans = await loadScanHistory()
			setHistory(scans)
			const initialTags: Record<string, string[]> = {}
			const initialNewTags: Record<string, string> = {}
			scans.forEach((scan) => {
				initialTags[scan.id] = []
				initialNewTags[scan.id] = ""
			})
			setTags(initialTags)
			setNewTags(initialNewTags)
		} catch (error) {
			console.error("Failed to load scan history:", error)
		}
	}

	useFocusEffect(
		useCallback(() => {
			fetchHistory()
		}, [])
	)

	const handleAddTag = (scanId: string) => {
		if (!newTags[scanId].trim()) return
		setTags((prevTags) => ({
			...prevTags,
			[scanId]: [...prevTags[scanId], newTags[scanId]],
		}))
		setNewTags((prevTags) => ({
			...prevTags,
			[scanId]: "",
		}))
	}

	const handleDeleteTag = (scanId: string, tag: string) => {
		setTags((prevTags) => ({
			...prevTags,
			[scanId]: prevTags[scanId].filter((t) => t !== tag),
		}))
	}

	const handleDeleteScan = async (id: string) => {
		try {
			const db = await require("expo-sqlite").openDatabaseAsync("skinsight.db")
			await db.withTransactionAsync(async () => {
				await db.runAsync(`DELETE FROM scans WHERE id = ?;`, [id])
			})
			fetchHistory()
		} catch (error) {
			console.error("Failed to delete scan:", error)
		}
	}

	return (
		<View className="flex-1 bg-background dark:bg-black">
			<FlatList
				className="pt-5"
				data={history}
				keyExtractor={(item) => item.id}
				ListHeaderComponent={() => (
					<Text className="text-3xl font-bold text-accent dark:text-white text-center mb-8 pt-10">
						Scan History
					</Text>
				)}
				ListEmptyComponent={() => (
					<Text className="text-center text-textSecondary dark:text-gray-400 mt-10">
						No scan history yet.
					</Text>
				)}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() =>
							router.push({
								pathname: "/results",
								params: {
									imageUri: item.imageUri,
									result: item.diagnosis,
									confidence: String(item.confidence ?? 0),
									fromHistory: "true", // 👈 prevents re-saving
								},
							})
						}
					>
						<View className="bg-surface dark:bg-[#1a1a1a] mx-5 mb-5 rounded-2xl shadow-lg">
							{/* Image */}
							<Image
								source={{ uri: item.imageUri }}
								className="w-full h-48 rounded-t-2xl"
							/>

							{/* Details */}
							<View className="p-5">
								<Text className="text-xl font-bold text-accent mb-2">
									{item.diagnosis}
								</Text>
								<Text className="text-textSecondary dark:text-gray-400 mb-2">
									Confidence: {item.confidence}%
								</Text>
								<Text className="text-textSecondary dark:text-gray-400">
									Scanned on: {new Date(item.date).toLocaleDateString()}
								</Text>

								{/* Tags */}
								<View className="flex-row flex-wrap mt-3">
									{tags[item.id]?.map((tag, index) => (
										<TouchableOpacity
											key={index}
											onPress={() => handleDeleteTag(item.id, tag)}
											className="bg-accent px-3 py-1 rounded-full mr-2 mb-2"
										>
											<Text className="text-white">{tag}</Text>
										</TouchableOpacity>
									))}
								</View>

								{/* Tag Input */}
								<View className="flex-row mt-2">
									<TextInput
										value={newTags[item.id] || ""}
										onChangeText={(text) =>
											setNewTags((prev) => ({ ...prev, [item.id]: text }))
										}
										placeholder="Add a tag"
										placeholderTextColor="#9CA3AF"
										className="bg-gray-200 dark:bg-gray-700 dark:text-white rounded-lg p-3 flex-1"
									/>
									<TouchableOpacity
										onPress={() => handleAddTag(item.id)}
										className="bg-accent ml-2 p-3 rounded-lg"
									>
										<Text className="text-white">Add</Text>
									</TouchableOpacity>
								</View>
							</View>

							{/* Delete Button */}
							<TouchableOpacity
								onPress={() => handleDeleteScan(item.id)}
								className="bg-red-500 p-4 rounded-b-2xl items-center"
							>
								<Text className="text-white font-bold">Delete</Text>
							</TouchableOpacity>
						</View>
					</TouchableOpacity>
				)}
				contentContainerStyle={{ paddingBottom: 100 }}
			/>
		</View>
	)
}
