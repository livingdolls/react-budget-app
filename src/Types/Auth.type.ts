export type TUser = {
	nama: string;
	email: string;
	password: string;
};

export type TBudget = {
	created_at?: string;
	id_main_budget: string;
	maxBudget: number;
	user?: TUser;
	userId: string;
};
