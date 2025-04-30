import React, { useState, useEffect, useCallback } from "react"
import {
	View,
	Text,
	Image,
	TextInput,
	Modal,
	TouchableOpacity,
	FlatList,
	Alert,
	RefreshControl,
} from "react-native"
import {
	loadScanHistory,
	ScanResult,
	clearScanHistory,
} from "@/utils/HistoryDatabase"

export default function History() {
	const [history, setHistory] = useState<ScanResult[]>([])
	const [tags, setTags] = useState<Record<string, string[]>>({}) // Track individual tags for each scan
	const [newTags, setNewTags] = useState<Record<string, string>>({}) // Track individual new tag input

	useEffect(() => {
		fetchHistory()
	}, [])

	const fetchHistory = async () => {
		try {
			const scans = await loadScanHistory()
			setHistory(scans)
			const initialTags: Record<string, string[]> = {}
			const initialNewTags: Record<string, string> = {}
			scans.forEach((scan) => {
				initialTags[scan.id] = [] // Initialize empty tag array for each scan
				initialNewTags[scan.id] = "" // Initialize empty input for each scan
			})
			setTags(initialTags)
			setNewTags(initialNewTags)
		} catch (error) {
			console.error("Failed to load scan history:", error)
		}
	}

	const handleAddTag = (scanId: string) => {
		if (!newTags[scanId].trim()) return // Don't add empty tags
		setTags((prevTags) => ({
			...prevTags,
			[scanId]: [...prevTags[scanId], newTags[scanId]], // Add the new tag for the specific scan
		}))
		setNewTags((prevTags) => ({
			...prevTags,
			[scanId]: "", // Reset the tag input for the specific scan
		}))
	}

	const handleDeleteTag = (scanId: string, tag: string) => {
		setTags((prevTags) => ({
			...prevTags,
			[scanId]: prevTags[scanId].filter((t) => t !== tag), // Remove the tag for the specific scan
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

	const onRefresh = useCallback(() => {
		fetchHistory()
	}, [])

	return (
		<View className="flex-1 bg-background">
			<FlatList
				className="bg-background pt-5"
				data={history}
				keyExtractor={(item) => item.id}
				ListHeaderComponent={() => (
					<Text className="text-3xl font-bold text-accent text-center mb-8 pt-10">
						Scan History
					</Text>
				)}
				renderItem={({ item }) => (
					<View className="bg-white mx-5 mb-5 rounded-2xl shadow-lg">
						{/* Image */}
						<TouchableOpacity>
							<Image
								source={{ uri: item.imageUri }}
								className="w-full h-48 rounded-t-2xl"
							/>
						</TouchableOpacity>

						{/* Details */}
						<View className="p-5">
							<Text className="text-xl font-bold text-accent mb-2">
								{item.diagnosis}
							</Text>
							<Text className="text-gray-600 mb-2">
								Confidence: {item.confidence}%
							</Text>
							<Text className="text-gray-600">
								Scanned on: {new Date(item.date).toLocaleDateString()}
							</Text>

							{/* Tagging Section */}
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

							{/* Add new tag */}
							<View className="flex-row">
								<TextInput
									value={newTags[item.id] || ""}
									onChangeText={(text) =>
										setNewTags((prevTags) => ({ ...prevTags, [item.id]: text }))
									}
									placeholder="Add a tag"
									placeholderTextColor="#6B7280"
									className="bg-gray-200 rounded-lg p-3 flex-1"
								/>
								<TouchableOpacity
									onPress={() => handleAddTag(item.id)}
									className="bg-accent ml-2 p-3 rounded-lg"
								>
									<Text className="text-white">Add</Text>
								</TouchableOpacity>
							</View>
						</View>

						{/* Delete Scan Button */}
						<TouchableOpacity
							onPress={() => handleDeleteScan(item.id)}
							className="bg-red-500 p-4 rounded-b-2xl items-center"
						>
							<Text className="text-white font-bold">Delete</Text>
						</TouchableOpacity>
					</View>
				)}
				contentContainerStyle={{ paddingBottom: 100 }}
				// refreshControl={
				// 	<RefreshControl
				// 		refreshing={refreshing}
				// 		onRefresh={onRefresh}
				// 	/>
				// }
			/>
		</View>
	)
}
