import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import logo from "../../assets/logo.png";
import AuthUser from "../../store/Auth.store";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
	const user = useRecoilState(AuthUser);

	console.log(user);
	return (
		<div className="w-full h-screen flex flex-col lg:flex-row  justify-center">
			<div className="bg-accent-green-500   lg:w-1/2 lg:flex hidden lg:flex-col justify-center">
				<div className=" h-3/4 w-full justify-end flex">
					<div
						className="  xl:w-2/4  w-full flex flex-col justify-center"
						style={{
							boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
						}}
					>
						<div className="m-auto">
							<img
								src={logo}
								alt="logo"
								className="h-[300px] w-[300px] m-auto"
							/>
							<p className="text-center text-2xl font-bold mt-6">
								Management Budget
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white lg:w-1/2 w-screen">
				<div className=" h-screen flex flex-col justify-center md:items-center lg:items-start">
					<div
						className=" xl:w-3/4 w-full h-3/4 2xl:p-20 p-5 flex flex-col justify-center"
						style={{
							boxShadow:
								"rgba(0, 0, 0, 0.56) 37px 22px 70px -20px",
						}}
					>
						<Routes>
							<Route index element={<Login />} />
							<Route path="/register" element={<Register />} />
						</Routes>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Auth;
