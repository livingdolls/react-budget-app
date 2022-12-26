import { toast } from "react-toastify";

export const NotifyAlert = (type: string, msg: string) => {
	switch (type) {
		case "success":
			toast.success(msg, {
				position: toast.POSITION.TOP_RIGHT,
				className: "!bg-accent-green-500 text-white font-bold",
				theme: "colored",
			});
			break;
		case "error":
			toast.error(msg, {
				position: toast.POSITION.TOP_RIGHT,
				theme: "colored",
			});
			break;
		default:
			toast(msg, {
				position: toast.POSITION.TOP_RIGHT,
			});
			break;
	}
};
