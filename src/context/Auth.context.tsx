import React, { createContext, useEffect, useState } from "react";
import client from "../config/axios";

type propsAuth = {
	children: React.ReactNode;
};

type token = {
	id_user: string;
};

type AuthContext = {
	auth: string;
	setAuth: React.Dispatch<React.SetStateAction<string>>;
};

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: propsAuth) => {
	const [auth, setAuth] = useState<string>(
		"8917b32a-750e-4a52-b149-4b75f68f74bf"
	);

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
