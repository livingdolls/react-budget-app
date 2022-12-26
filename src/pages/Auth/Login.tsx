import { useState } from "react";
import { NavLink } from "react-router-dom";
import { NotifyAlert } from "../../components/Toast";
import { LoginService } from "../../Services/Auth.services";
import { TUser } from "../../Types/Auth.type";

const Login = () => {
	const [user, setUser] = useState<Omit<TUser, "nama">>({
		email: "",
		password: "",
	});

	const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		LoginService(user)
			.then((data) => console.log(data))
			.catch((err) => {
				NotifyAlert("success", err.response.data);
			});
	};

	return (
		<div className="p-10 ">
			<div className="mb-6">
				<p className="text-2xl font-semibold text-gray-800 text-center">
					Log In
				</p>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="mb-6">
					<label
						htmlFor={"email"}
						className="block mb-2 ml-1 text-lg font-medium text-gray-900 dark:text-white"
					>
						Email
					</label>
					<input
						type="email"
						name="email"
						id="email"
						className="bg-gray-50 border-gray-500 ring-2 ring-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-accent-green-500 focus:outline-none focus:border-transparent block w-full p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Email"
						onChange={handleForm}
						required
					/>
				</div>

				<div className="mb-6">
					<label
						htmlFor={"password"}
						className="block mb-2 ml-1 text-lg font-medium text-gray-900 dark:text-white"
					>
						Password
					</label>
					<input
						type="password"
						id="password"
						className="bg-gray-50 border-gray-500 ring-2 ring-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-accent-green-500 focus:outline-none focus:border-transparent block w-full p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Password"
						name="password"
						onChange={handleForm}
						required
					/>
				</div>

				<div className="mb-3">
					<button
						type="submit"
						className="p-3 bg-accent-green-500 rounded-md w-full text-gray-900 font-bold hover:bg-accent-green-900"
					>
						LOGIN
					</button>
				</div>
			</form>

			<div>
				<p>
					Belum punya akun ? daftar{" "}
					<NavLink
						to={"/auth/register"}
						className="hover:text-accent-green-900 text-accent-green-500"
					>
						disini
					</NavLink>
				</p>
			</div>
		</div>
	);
};

export default Login;
