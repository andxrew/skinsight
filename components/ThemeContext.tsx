import React, { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useColorScheme, colorScheme } from "nativewind"

type Theme = "light" | "dark"

interface ThemeContextType {
	theme: Theme
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
	theme: "light",
	toggleTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = useState<Theme>("light")

	useEffect(() => {
		const loadTheme = async () => {
			const stored = await AsyncStorage.getItem("theme")
			const preferred =
				stored === "dark" || stored === "light" ? stored : "light"
			setTheme(preferred)
			colorScheme.set(preferred) // NativeWind v4 control
			console.log("🌙 [Theme] Loaded theme:", preferred)
		}
		loadTheme()
	}, [])

	const toggleTheme = async () => {
		const newTheme = theme === "dark" ? "light" : "dark"
		setTheme(newTheme)
		await AsyncStorage.setItem("theme", newTheme)
		colorScheme.set(newTheme) // apply to NativeWind
		console.log("🔁 [Theme] Toggling to:", newTheme)
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}
