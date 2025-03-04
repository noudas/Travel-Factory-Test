import React from "react";

interface RequestFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const RequestFilter: React.FC<RequestFilterProps> = ({ filter, setFilter }) => {
  return (
    <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border p-2">
      <option value="ALL">All</option>
      <option value="PENDING">Pending</option>
      <option value="APPROVED">Approved</option>
      <option value="REJECTED">Rejected</option>
    </select>
  );
};

export default RequestFilter;
