import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRequests } from "../redux/slices/requestSlice";
import { RootState, AppDispatch } from "../redux/store/store";
import RequestForm from "../components/RequestForm";
import RequestTable from "../components/RequestTable";
import Header from "../components/Header";
import Accordion from "../components/Accordion";

const RequesterDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { requests, loading, error } = useSelector((state: RootState) => state.requests);

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchUserRequests(user.id));
    }
  }, [dispatch, user]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 overflow-x-hidden">
      <Header />
      <div className="w-full max-w-3xl p-6 space-y-6">
        <Accordion title="Submit Vacation Request">
          <RequestForm />
        </Accordion>
        <Accordion title="My Requests">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <RequestTable requests={requests} />
        </Accordion>
      </div>
    </div>
  );
};

export default RequesterDashboard;
