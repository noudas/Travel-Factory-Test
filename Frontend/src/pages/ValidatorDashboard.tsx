import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRequests } from "../redux/slices/requestSlice";
import { RootState, AppDispatch } from "../redux/store/store";
import RequestFilter from "../components/RequestFilter";
import RequestList from "../components/RequestList";
import Header from "../components/Header";

const ValidatorDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { requests, loading, error } = useSelector((state: RootState) => state.requests);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    dispatch(fetchAllRequests());
  }, [dispatch]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Header />
      <h2 className="text-2xl font-bold mb-4">Vacation Requests</h2>
      
      <RequestFilter filter={filter} setFilter={setFilter} />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <RequestList requests={requests} filter={filter} />
    </div>
  );
};

export default ValidatorDashboard;
