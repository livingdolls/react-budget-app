import { Expense } from "../pages/Dashboard/ExpensePlan";

const SumExpense = (exp: Expense[]) => {
	const total = exp.reduce((prev, up): any => {
		return prev.maxExpense + up.maxExpense;
	});

	return total;
};

export default SumExpense;
