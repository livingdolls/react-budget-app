import { TIncome } from "../../../Types/Budget.types";
import Rupiah from "../../../utils/Rupiah";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DeleteSvg, EditSvg } from "../../../components/svg";
import id from "dayjs/locale/id";

type incomeProps = {
	income: TIncome[];
	setIncome: (data: TIncome) => void;
	hapusIncome: (data: TIncome) => void;
};

export const TableIncome = ({
	income,
	setIncome,
	hapusIncome,
}: incomeProps) => {
	dayjs.extend(customParseFormat);
	dayjs.locale(id);
	return (
		<div className="flex flex-col">
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
								{income.map((e, i) => {
									let date = dayjs(e.create_at).format(
										"dddd DD-MM-YYYY"
									);
									return (
										<tr
											className="border-b"
											key={e.id_income}
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
												<button
													onClick={() => setIncome(e)}
													className="text-white p-1 rounded-xl bg-accent-green-500 font-bold"
												>
													<EditSvg />
												</button>

												<button
													onClick={() =>
														hapusIncome(e)
													}
													className="text-white bg-material-20 p-1 rounded-xl ml-2"
												>
													<DeleteSvg />
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};
