import axios from "axios";
import jwtDecode from "jwt-decode";
import { atom, selector } from "recoil";
import { FindProfileUser } from "../Services/Auth.service";

const AuthUser = atom({
	key: "auth-user",
	default: [],
});

export const ProfileUser = selector({
	key: "profil",
	get: async ({ get }) => {
		const profil: any = get(AuthUser);
		try {
			const datas: any = jwtDecode(profil);
			try {
				const find = await FindProfileUser(datas.userId);

				return find.data;
			} catch (error) {
				return false;
			}
		} catch (error) {
			return false;
		}
	},
});

export default AuthUser;
