import { useAuthStore } from "@/store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes: React.FC = () => {
  const { authUser } = useAuthStore();
  return authUser ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
