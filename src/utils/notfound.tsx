import { Link } from "react-router-dom";

export const NotFound = () => {
	return (
		<div className="w-screen h-screen flex flex-col justify-center content-center">
			<div className="mx-auto flex justify-center flex-col">
				<p className="text-9xl text-center text-gray-800">404</p>
				<p className="text-center text-2xl text-gray-800">
					Halaman tidak ditemukan
				</p>
				<Link to={"/home/"}>
					<button className="bg-accent-green-500 hover:bg-accent-green-900 p-2 px-3 mt-2 text-lg text-white w-full font-semibold rounded-lg ">
						HOME
					</button>
				</Link>
			</div>
		</div>
	);
};
