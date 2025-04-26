import { Stack } from "expo-router"
import "./global.css"

export default function RootLayout() {
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
