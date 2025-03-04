import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserRequests } from "../redux/slices/requestSlice";
import { AppDispatch } from "../redux/store/store";
import RequestForm from "../components/RequestForm";
import RequestTable from "../components/RequestTable";
import Header from "../components/Header";
import Accordion from "../components/Accordion";

const RequesterDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserRequests());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <Header />
      <div className="w-full max-w-3xl p-6 space-y-6">
        <Accordion title="Submit Vacation Request">
          <RequestForm />
        </Accordion>
        <Accordion title="My Requests">
          <RequestTable />
        </Accordion>
      </div>
    </div>
  );
};

export default RequesterDashboard;
