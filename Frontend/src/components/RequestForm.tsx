import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createRequest, fetchUserRequests } from "../redux/slices/requestSlice";
import { AppDispatch } from "../redux/store/store";
import { Input } from "./Input";
import { Button } from "./Button";

const RequestForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createRequest(formData));
    setFormData({ startDate: "", endDate: "", reason: "" });
    dispatch(fetchUserRequests());
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 space-y-4 border border-gray-200">

      {/* Form Fields */}
      <div className="grid gap-4">
        <Input type="date" name="startDate" required value={formData.startDate} onChange={handleChange} />
        <Input type="date" name="endDate" required value={formData.endDate} onChange={handleChange} />
        <textarea
          name="reason"
          placeholder="Reason (Optional)"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 transition"
          rows={3}
          onChange={handleChange}
          value={formData.reason}
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 transition">
        Submit Request
      </Button>
    </form>
  );
};

export default RequestForm;
