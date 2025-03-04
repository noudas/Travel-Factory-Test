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

  useEffect(() => {
    dispatch(fetchUserRequests());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createRequest(formData));
    setFormData({ startDate: "", endDate: "", reason: "" }); // Reset form
    dispatch(fetchUserRequests()); // Refresh data after submitting
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <LogoutButton />
      <h2 className="text-2xl font-bold mb-4">Submit Vacation Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input type="date" name="startDate" required value={formData.startDate} onChange={handleChange} />
        <Input type="date" name="endDate" required value={formData.endDate} onChange={handleChange} />
        <textarea name="reason" placeholder="Reason (Optional)" className="border p-2 w-full" onChange={handleChange} value={formData.reason} />
        <Button type="submit">Submit</Button>
      </form>

      <h3 className="text-xl font-bold mt-6">My Requests</h3>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">Reason</th>
              <th className="border p-2 text-left">Start Date</th>
              <th className="border p-2 text-left">End Date</th>
              <th className="border p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((req, index) => (
                <tr key={req.id ?? `request-${index}`} className="border">
                  <td className="border p-2">{req.reason || "No reason provided"}</td>
                  <td className="border p-2">{new Date(req.startDate).toLocaleDateString()}</td>
                  <td className="border p-2">{new Date(req.endDate).toLocaleDateString()}</td>
                  <td className="border p-2 font-semibold">{req.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="border p-2 text-center text-gray-500">
                  No requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequesterDashboard;
