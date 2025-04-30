import { Stack } from "expo-router"
import { useEffect } from "react"
import { initHistoryTable } from "@/utils/HistoryDatabase"
import "./global.css"

export default function RootLayout() {
	useEffect(() => {
		;(async () => {
			try {
				await initHistoryTable()
				console.log("✅ Database initialized")
			} catch (error) {
				console.error("Failed to initialize DB:", error)
			}
		})()
	}, [])
	return (
		<Stack>
			<Stack.Screen
				name="(tabs)"
				options={{ headerShown: false }}
			/>
			{/* Special Flow Pages */}
			<Stack.Screen
				name="preview"
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="analyzing"
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="results"
				options={{ headerShown: false }}
			/>
		</Stack>
	)
}
