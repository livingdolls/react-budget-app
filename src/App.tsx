import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import Auth from "./pages/Auth";
import Main from "./pages/Main";

function App() {
	return (
		<div className="bg-indigo-100 h-screen">
			<Routes>
				<Route path="/home" element={<Main />} />
				<Route path="/auth/*" element={<Auth />} />
			</Routes>
		</div>
	);
}

export default App;
