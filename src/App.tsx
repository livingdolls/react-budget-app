import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Main from "./pages/Dashboard/Main";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import ProtectRoute from "./middleware/ProtectRoute";
import MainPage from "./pages";
import { NotFound } from "./utils/notfound";

function App() {
	return (
		<div className="">
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route element={<ProtectRoute />}>
					<Route path="/home/*" element={<Main />} />
				</Route>
				<Route path="/auth/*" element={<Auth />} />

				<Route path="*" element={<NotFound />} />
			</Routes>
			<ToastContainer />
		</div>
	);
}

export default App;
