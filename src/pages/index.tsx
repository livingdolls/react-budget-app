import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const MainPage = () => {
	return (
		<div className="h-screen w-screen bg-accent-green-500 flex justify-center items-center">
			<div className=" w-[80%] md:w-[60%] lg:w-[40%] 2xl:w-[30%] flex flex-col justify-center">
				<div>
					<img src={logo} alt="logo" className="m-auto" />
				</div>

				<div className="mt-5">
					<p className="text-center text-gray-800 font-bold text-2xl">
						SELAMAT DATANG DI APLIKASI MANAJEMEN KEUANGAN
					</p>
				</div>

				<div className="mt-5">
					<NavLink to={"/auth/"}>
						<button className="w-full ring-1 ring-white  p-2 text-lg text-accent-green-500 bg-green-100 font-bold rounded-md">
							MASUK
						</button>
					</NavLink>

					<NavLink to={"/auth/register"}>
						<button className="w-full  mt-2 p-2 text-lg text-white bg-accent-green-600 ring-1  ring-white font-bold rounded-md">
							DAFTAR
						</button>
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default MainPage;
