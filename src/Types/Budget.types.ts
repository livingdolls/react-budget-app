export type Expense = {
	create_at?: string;
	idMainBudget: string;
	id_expensePlan: string;
	maxExpense: number;
	title: string;
	usage: number;
};

export type TBudget = {
	id_main_budget: string;
	maxBudget: number;
	userId: string;
	created_at?: string;
	expensive: Expense[];
};

export type TIncome = {
	budget: number;
	create_at?: string;
	idMainBudget?: string;
	id_income?: string;
	title: string;
};

export type TExpense = {
	budget: number;
	create_at?: string;
	idExpensePlan: string;
	id_expense: string;
	title: string;
};
