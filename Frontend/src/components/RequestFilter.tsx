import React from "react";

interface RequestFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const RequestFilter: React.FC<RequestFilterProps> = ({ filter, setFilter }) => {
  return (
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    >
      <option value="ALL">All</option>
      <option value="PENDING">Pending</option>
      <option value="APPROVED">Approved</option>
      <option value="REJECTED">Rejected</option>
    </select>
  );
};

export default RequestFilter;
