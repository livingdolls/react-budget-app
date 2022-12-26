/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	theme: {
		extend: {
			colors: {
				"accent-green": {
					500: "#1aebb6",
					600: "#19e7b3",
					900: "#14bc91",
				},
				material: {
					10: "#d63031",
					20: "#ff7675",
					30: "#fab1a0",
					40: "#ffeaa7",
					50: "#fdcb6e",
					60: "##74b9ff",
					70: "#0984e3",
					80: "#81ecec",
					90: "#55efc4",
					100: "#00b894",
				},
			},
		},
	},
	plugins: [],
};
