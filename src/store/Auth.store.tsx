import { atom, selector } from "recoil";

const AuthUser = atom({
	key: "auth-user",
	default: "Nanang",
});

export default AuthUser;
