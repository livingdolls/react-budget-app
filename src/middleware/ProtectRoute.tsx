import { Navigate, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import AuthUser from "../store/Auth.store";

const ProtectRoute = () => {
	const [user] = useRecoilState(AuthUser);
	return user.length !== 0 ? <Outlet /> : <Navigate to={"/auth/"} />;
};

export default ProtectRoute;
