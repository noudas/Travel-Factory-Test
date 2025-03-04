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
    <div className="max-w-2xl mx-auto p-6">
      <Header />
      <Accordion title="Submit Vacation Request">
        <RequestForm />
      </Accordion>
      <Accordion title="My Requests">
        <RequestTable />
      </Accordion>
    </div>
  );
};

export default RequesterDashboard;
