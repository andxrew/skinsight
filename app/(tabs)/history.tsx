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
	const [previewImage, setPreviewImage] = useState<string | null>(null)
	const [tags, setTags] = useState<Record<string, string>>({}) // To track individual tags by scan ID
	const [refreshing, setRefreshing] = useState(false)

	useEffect(() => {
		fetchHistory()
	}, [])

	const fetchHistory = async () => {
		try {
			const scans = await loadScanHistory()
			setHistory(scans)
			const initialTags: Record<string, string> = {}
			scans.forEach((scan) => {
				initialTags[scan.id] = "" // Initialize an empty tag for each scan
			})
			setTags(initialTags)
		} catch (error) {
			console.error("Failed to load scan history:", error)
		} finally {
			setRefreshing(false)
		}
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
		setRefreshing(true)
		fetchHistory()
	}, [])

	const handleDeleteConfirmation = (id: string) => {
		Alert.alert("Delete Scan", "Are you sure you want to delete this scan?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Delete",
				style: "destructive",
				onPress: () => handleDeleteScan(id),
			},
		])
	}

	// Update the tag for a specific scan
	const handleTagChange = (id: string, newTag: string) => {
		setTags((prevTags) => ({
			...prevTags,
			[id]: newTag, // Update the tag for the specific scan
		}))
	}

	return (
		<View className="flex-1 bg-background">
			{/* Modal for Preview */}
			{previewImage && (
				<Modal
					visible={true}
					transparent={true}
				>
					<View className="flex-1 justify-center items-center bg-black bg-opacity-60">
						<Image
							source={{ uri: previewImage }}
							className="w-full h-full"
							resizeMode="contain"
						/>
						{/* Close Button */}
						<TouchableOpacity
							onPress={() => setPreviewImage(null)}
							className="absolute top-4 right-4 bg-white rounded-full p-3"
						>
							<Text className="text-black text-3xl">❌</Text>
						</TouchableOpacity>
					</View>
				</Modal>
			)}

			{/* Heading */}
			<Text className="text-2xl font-bold text-accent text-center mb-8">
				Scan History
			</Text>

			<FlatList
				data={history}
				keyExtractor={(item) => item.id}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
				contentContainerStyle={{ paddingBottom: 100 }}
				renderItem={({ item }) => (
					<View className="bg-white mx-5 mb-5 rounded-2xl shadow-lg">
						{/* Image */}
						<TouchableOpacity onPress={() => setPreviewImage(item.imageUri)}>
							<Image
								source={{ uri: item.imageUri }}
								className="w-full h-48 rounded-t-2xl"
								resizeMode="cover"
							/>
						</TouchableOpacity>

						{/* Details */}
						<View className="p-5">
							<Text className="text-xl font-bold text-accent mb-2">
								{item.diagnosis}
							</Text>
							{item.confidence !== undefined && (
								<Text className="text-gray-600 mb-1">
									Confidence: {item.confidence}%
								</Text>
							)}
							<Text className="text-gray-600">
								Scanned on: {new Date(item.date).toLocaleDateString()}
							</Text>

							{/* Tagging and Notes */}
							<TextInput
								value={tags[item.id] || ""}
								onChangeText={(newTag) => handleTagChange(item.id, newTag)}
								placeholder="Add a tag or note"
								className="bg-gray-200 rounded-lg p-3 mt-3"
							/>
						</View>

						{/* Delete Button */}
						<TouchableOpacity
							onPress={() => handleDeleteConfirmation(item.id)}
							className="bg-red-500 p-4 rounded-b-2xl items-center"
						>
							<Text className="text-white font-bold">Delete</Text>
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
	)
}
