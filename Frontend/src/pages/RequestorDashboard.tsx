import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRequest, fetchUserRequests } from "../redux/slices/requestSlice";
import { RootState, AppDispatch } from "../redux/store/store";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import LogoutButton from "../components/LogoutButton";

const RequesterDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { requests, loading, error } = useSelector((state: RootState) => state.requests);

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",    
  });

  // Debugging: Log initial component render
  useEffect(() => {
    console.log("📌 RequesterDashboard mounted");

    console.log("📢 Fetching user requests...");
    dispatch(fetchUserRequests());

    return () => {
      console.log("🔻 RequesterDashboard unmounted");
    };
  }, [dispatch]);

  // Debugging: Log form state changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("📝 Updated formData:", { ...formData, [e.target.name]: e.target.value });
  };

  // Debugging: Log form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚀 Submitting request with data:", formData);
    dispatch(createRequest({
      start_date: formData.startDate,
      end_date: formData.endDate,
      reason: formData.reason
    }));
  };

  // Debugging: Log request state updates
  useEffect(() => {
    console.log("📊 Requests state updated:", requests);
  }, [requests]);

  useEffect(() => {
    if (loading) console.log("⏳ Loading requests...");
  }, [loading]);

  useEffect(() => {
    if (error) console.error("❌ Error fetching requests:", error);
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <LogoutButton />
      <h2 className="text-2xl font-bold mb-4">Submit Vacation Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input type="date" name="startDate" required value={formData.startDate} onChange={handleChange} />
        <Input type="date" name="endDate" required value={formData.endDate} onChange={handleChange} />
        <textarea name="reason" placeholder="Reason (Optional)" className="border p-2 w-full" onChange={handleChange} />
        <Button type="submit">Submit</Button>
      </form>

      <h3 className="text-xl font-bold mt-6">My Requests</h3>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {requests.map((req) => (
          <li key={req.id} className="border p-2 my-2">
            {req.reason} - {req.startDate} to {req.endDate} ({req.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequesterDashboard;
