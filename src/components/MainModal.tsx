import { CloseSvg } from "./svg";

type props = {
	judul: String;
	children: React.ReactNode;
	action: () => void;
};
const MainModal: React.FC<props> = ({ children, judul, action }) => {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
			<div className="relative w-full h-full max-w-2xl md:h-auto">
				<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
					<div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
							{judul}
						</h3>
						<button
							type="button"
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
							data-modal-toggle="defaultModal"
							onClick={action}
						>
							<CloseSvg />
							<span className="sr-only">Close modal</span>
						</button>
					</div>

					<div className="p-6">{children}</div>
				</div>
			</div>
		</div>
	);
};

export default MainModal;
