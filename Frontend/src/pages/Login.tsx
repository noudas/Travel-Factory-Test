import React, { useState, useEffect } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { RootState, AppDispatch } from "../redux/store/store";
import { useNavigate } from "react-router";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  // Redirect user based on role after login
  useEffect(() => {
    if (user?.role) {
      navigate(user.role === "VALIDATOR" ? "/validator-dashboard" : "/requester-dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-xl border border-gray-300 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full"
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full"
            required
          />
          <Button
            type="submit"
            className={`w-full ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
