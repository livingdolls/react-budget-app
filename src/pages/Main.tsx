import { useState } from "react";
import CardExpense from "../components/CardExpense";
import Modal from "../components/Modal";

const Main = () => {
	const [visible, setVisible] = useState<boolean>(false);

	const handleModal = () => {
		setVisible(!visible);
	};
	return (
		<div className=" lg:container mx-auto sm:w-10/12 xs:w-11/12 border-cyan-500 ">
			<div className="flex justify-center p-10 bg-indigo-500">
				<p className="text-white text-4xl">RP 6.000.000</p>
			</div>

			<div>
				<CardExpense num={45} setVisible={setVisible} />
			</div>

			<div>
				<Modal visible={visible} setVisible={setVisible}>
					<p>Hello</p>
				</Modal>
			</div>
		</div>
	);
};

export default Main;
