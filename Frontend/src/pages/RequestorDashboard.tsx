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
    start_date: "",
    end_date: "",
    reason: "",
  });

  useEffect(() => {
    dispatch(fetchUserRequests());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createRequest(formData));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
        <LogoutButton/>
      <h2 className="text-2xl font-bold mb-4">Submit Vacation Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input type="date" name="start_date" required value={formData.start_date} onChange={handleChange} />
        <Input type="date" name="end_date" required value={formData.end_date} onChange={handleChange} />
        <textarea name="reason" placeholder="Reason (Optional)" className="border p-2 w-full" onChange={handleChange} />
        <Button type="submit">Submit</Button>
      </form>

      <h3 className="text-xl font-bold mt-6">My Requests</h3>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {requests.map((req: { id: React.Key | null | undefined; start_date: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; end_date: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; status: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
          <li key={req.id} className="border p-2 my-2">
            {req.start_date} - {req.end_date} | {req.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequesterDashboard;
