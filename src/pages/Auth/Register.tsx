import { useState } from "react";
import { useMutation } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { NotifyAlert } from "../../components/Toast";
import { RegisterService } from "../../Services/Auth.service";

type RegisterType = {
	nama: string;
	email: string;
	password: string;
};

const Register = () => {
	const [register, setRegister] = useState<RegisterType>({
		nama: "",
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const mutate = useMutation(RegisterService, {
		onError: async (err: any) => {
			if (err.response.status === 409) {
				NotifyAlert("error", err.response.data.message);
			}

			const zod = err.response.data;
			if (err.response.status === 400) {
				zod.map((e: any) => {
					NotifyAlert("error", e.message);
				});
			}

			NotifyAlert("error", err.response.data.message);
		},
		onSuccess: async () => {
			NotifyAlert("success", "Berhasil mendaftar!, silahkan login");
			navigate("/auth/");
		},
	});

	const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRegister({ ...register, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		mutate.mutate(register);
	};
	return (
		<form onSubmit={handleSubmit}>
			<div className="p-1 xl:p-10">
				<div className="mb-6">
					<p className="text-2xl font-semibold text-gray-800 text-center">
						Register
					</p>
				</div>

				<div className="mb-6">
					<label
						htmlFor={"email"}
						className="block mb-2 ml-1 text-lg font-medium text-gray-900 dark:text-white"
					>
						Nama
					</label>
					<input
						type="text"
						id="nama"
						name="nama"
						onChange={handleForm}
						className="bg-gray-50 border-gray-500 ring-2 ring-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-accent-green-500 focus:outline-none focus:border-transparent block w-full p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Nama"
						required
					/>
				</div>

				<div className="mb-6">
					<label
						htmlFor={"email"}
						className="block mb-2 ml-1 text-lg font-medium text-gray-900 dark:text-white"
					>
						Email
					</label>
					<input
						type="email"
						id="email"
						onChange={handleForm}
						name="email"
						className="bg-gray-50 border-gray-500 ring-2 ring-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-accent-green-500 focus:outline-none focus:border-transparent block w-full p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Email"
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
						name="password"
						onChange={handleForm}
						className="bg-gray-50 border-gray-500 ring-2 ring-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-accent-green-500 focus:outline-none focus:border-transparent block w-full p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Password"
						required
					/>
				</div>

				<div className="mb-3">
					<button
						type="submit"
						className="p-3 bg-accent-green-500 rounded-md w-full text-gray-900 font-bold hover:bg-accent-green-900"
					>
						REGISTER
					</button>
				</div>

				<div>
					<p>
						Sudah punya akun ? login{" "}
						<NavLink
							to={"/auth/"}
							className="text-accent-green-500 hover:text-accent-green-900"
						>
							disini
						</NavLink>
					</p>
				</div>
			</div>
		</form>
	);
};

export default Register;
