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
			},
		},
	},
	plugins: [],
};
