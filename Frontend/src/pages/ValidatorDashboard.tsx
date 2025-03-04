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
    <div className="flex flex-col items-center min-h-screen bg-gray-50 overflow-x-hidden">
      <Header />

      <div className="w-full max-w-3xl p-6 space-y-4">
        <h2 className="text-lg font-bold">Vacation Requests</h2>

        <div className="flex justify-end">
          <RequestFilter filter={filter} setFilter={setFilter} />
        </div>

        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
          <RequestList requests={requests} filter={filter} />
        </div>
      </div>
    </div>
  );
};

export default ValidatorDashboard;
