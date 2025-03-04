import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserRequests } from "../redux/slices/requestSlice";
import { AppDispatch } from "../redux/store/store";
import RequestForm from "../components/RequestForm";
import RequestTable from "../components/RequestTable";
import Header from "../components/Header";

const RequesterDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserRequests());
  }, [dispatch]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Header />
      <h2 className="text-2xl font-bold mb-4">Submit Vacation Request</h2>
      <RequestForm />
      <RequestTable />
    </div>
  );
};

export default RequesterDashboard;
