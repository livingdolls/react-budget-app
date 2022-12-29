import dayjs from "dayjs";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { FindExpensePlan } from "../../../Services/ExpansePlan";
import AuthUser from "../../../store/Auth.store";
import { TExpense } from "../../../Types/Budget.types";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ClimbingBoxLoader } from "react-spinners";
import Rupiah from "../../../utils/Rupiah";

const DetailExpense = () => {
	const { idExpensePlan } = useParams();
	const [user] = useRecoilState(AuthUser);
	dayjs.extend(customParseFormat);

	if (idExpensePlan === undefined) {
		return <p>H</p>;
	}

	const expensePlan = useQuery("expense", () =>
		FindExpensePlan(idExpensePlan, user)
	);

	if (expensePlan.isFetching) {
		return <div>Fetch</div>;
	}

	if (expensePlan.isLoading) {
		return (
			<div className="h-screen flex justify-center flex-col items-center content-center">
				<ClimbingBoxLoader color="#36d7b7" size={50} />
			</div>
		);
	}

	return (
		<div className="w-full h-full p-2 bg-white shadow-lg">
			<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
					<div className="overflow-x-auto">
						<table className="min-w-full">
							<thead className="border-b bg-accent-green-500">
								<tr>
									<th
										scope="col"
										className="text-md font-bold text-gray-900 px-6 py-4 text-left"
									>
										No
									</th>
									<th
										scope="col"
										className="text-md font-bold text-gray-900 px-6 py-4 text-left"
									>
										Nama
									</th>
									<th
										scope="col"
										className="text-md font-bold text-gray-900 px-6 py-4 text-left"
									>
										Total
									</th>
									<th
										scope="col"
										className="text-md font-bold text-gray-900 px-6 py-4 text-left"
									>
										Tanggal
									</th>
									<th
										scope="col"
										className="text-md font-bold text-gray-900 px-6 py-4 text-left"
									>
										Aksi
									</th>
								</tr>
							</thead>
							<tbody>
								{expensePlan.data.data.Expense.map(
									(e: TExpense, i: number) => {
										let date = dayjs(e.create_at).format(
											"dddd DD-MM-YYYY"
										);
										return (
											<tr
												className="border-b"
												key={e.id_expense}
											>
												<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
													{i + 1}
												</td>
												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													{e.title}
												</td>
												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													{Rupiah(e.budget)}
												</td>
												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													{date}
												</td>
												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													Aksi
												</td>
											</tr>
										);
									}
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailExpense;
