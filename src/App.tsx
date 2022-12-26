import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Main from "./pages/Dashboard/Main";

function App() {
	return (
		<div className="">
			<Routes>
				<Route path="/home/*" element={<Main />} />
				<Route path="/auth/*" element={<Auth />} />
			</Routes>
		</div>
	);
}

export default App;
