import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRequests } from "../redux/slices/requestSlice";
import { RootState, AppDispatch } from "../redux/store/store";
import { Button } from "../components/Button";
import LogoutButton from "../components/LogoutButton";

const ValidatorDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { requests, loading, error } = useSelector((state: RootState) => state.requests);
  
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    dispatch(fetchAllRequests());
  }, [dispatch]);

  const filteredRequests = requests.filter((req) => filter === "ALL" || req.status === filter);

  return (
    <div className="max-w-3xl mx-auto p-6">
        <LogoutButton/>
      <h2 className="text-2xl font-bold mb-4">Vacation Requests</h2>
      
      <select onChange={(e) => setFilter(e.target.value)} className="border p-2">
        <option value="ALL">All</option>
        <option value="PENDING">Pending</option>
        <option value="APPROVED">Approved</option>
        <option value="REJECTED">Rejected</option>
      </select>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {filteredRequests.map((req) => (
        <div key={req.id} className="border p-2 my-2">
          {req.startDate} - {req.endDate} | {req.status}
          <Button>Approve</Button>
          <Button>Reject</Button>
        </div>
      ))}
    </div>
  );
};

export default ValidatorDashboard;
