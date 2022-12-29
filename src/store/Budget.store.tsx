import { atom } from "recoil";

const BudgetStore = atom({
	key: "budget",
	default: {
		budget: 0,
		usage: 0,
	},
});

export default BudgetStore;
