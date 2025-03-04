import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createRequest, fetchUserRequests } from "../redux/slices/requestSlice";
import { AppDispatch } from "../redux/store/store";
import { Input } from "./Input";
import { Button } from "./Button";

interface RequestFormProps {}

const RequestForm: React.FC<RequestFormProps> = () => {
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
    dispatch(fetchUserRequests()); // Refresh requests after submitting
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input type="date" name="startDate" required value={formData.startDate} onChange={handleChange} />
      <Input type="date" name="endDate" required value={formData.endDate} onChange={handleChange} />
      <textarea
        name="reason"
        placeholder="Reason (Optional)"
        className="border p-2 w-full"
        onChange={handleChange}
        value={formData.reason}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default RequestForm;
