import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Main from "./pages/Dashboard/Main";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<div className="">
			<Routes>
				<Route path="/home/*" element={<Main />} />
				<Route path="/auth/*" element={<Auth />} />
			</Routes>
			<ToastContainer />
		</div>
	);
}

export default App;
