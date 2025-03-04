import { useDispatch } from "react-redux";
import { useNavigate } from "react-router"; // Fixed import
import { logout } from "../redux/slices/authSlice";
import { Button } from "./Button";

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
