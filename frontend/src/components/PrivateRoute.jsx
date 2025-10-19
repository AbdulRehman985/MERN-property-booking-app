import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const ProtectedRoute = ({ adminOnly = false }) => {
    const { userInfo } = useSelector((state) => state.auth);
    if (!userInfo) return <Navigate to="/login" replace />;
    if (adminOnly && !userInfo.isAdmin) {
        toast.error("User must be Admin ")
        return <Navigate to="/" replace />

    };
    return <Outlet />;
};
