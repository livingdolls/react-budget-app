import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Main from "./pages/Main";

function App() {
	return (
		<div className=" bg-indigo-500 sm:bg-orange-500 md:bg-red-800 lg:bg-yellow-500 lg:container mx-auto sm:w-10/12 xs:w-11/12 border-cyan-500">
			<Main />
		</div>
	);
}

export default App;
