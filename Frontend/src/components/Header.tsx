import React from "react";
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <header className="flex justify-between items-center bg-gray-800 text-white p-4 shadow-md">
      <h1 className="text-lg font-semibold">
        Welcome, {user?.username || "User"}!
      </h1>
      <LogoutButton />
    </header>
  );
};

export default Header;
