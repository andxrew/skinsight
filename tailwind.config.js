/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all of your component files.
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {},
	},
	plugins: [],
	darkMode: "class", // or 'media'
	theme: {
		extend: {
			colors: {
				accent: "#4169E1",
				accentHover: "#2749AA",
				accentSoft: "#7F9DFF",
				navLight: "#F0F4FF",
				navDark: "#1A2440",
				surface: "#FFFFFF",
				background: "#F9FAFB",
				textPrimary: "#1F2937",
				textSecondary: "#4B5563",
				success: "#22C55E",
				danger: "#DC2626",
			},
		},
	},
}
