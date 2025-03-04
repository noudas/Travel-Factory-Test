import React from "react";
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <header className="flex min-w-screen justify-between items-center bg-gray-900 text-gray-100 px-75 py-3 border-b border-gray-700 ">
      <h1 className="text-lg font-medium tracking-wide">
        Welcome, {user?.username || "User"}!
      </h1>
      <LogoutButton />
    </header>
  );
};

export default Header;
