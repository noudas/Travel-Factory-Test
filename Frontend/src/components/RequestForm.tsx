import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRequest, fetchUserRequests } from "../redux/slices/requestSlice";
import { AppDispatch, RootState } from "../redux/store/store";
import { Input } from "./Input";
import { Button } from "./Button";

const RequestForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createRequest(formData));
    setFormData({ startDate: "", endDate: "", reason: "" });

    if (user?.id) {
      dispatch(fetchUserRequests(user.id));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 space-y-4 border border-gray-200">
      <div className="grid gap-4">
        <Input
          type="date"
          name="startDate"
          required
          value={formData.startDate}
          onChange={handleChange}
          min={today} // Set the min date to today
        />
        <Input
          type="date"
          name="endDate"
          required
          value={formData.endDate}
          onChange={handleChange}
          min={today} // Set the min date to today
        />
        <textarea
          name="reason"
          placeholder="Reason (Optional)"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 transition"
          rows={3}
          onChange={handleChange}
          value={formData.reason}
        />
      </div>
      <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 transition">
        Submit Request
      </Button>
    </form>
  );
};

export default RequestForm;
