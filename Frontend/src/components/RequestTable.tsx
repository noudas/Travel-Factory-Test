import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

const RequestTable: React.FC = () => {
  const { requests, loading, error } = useSelector((state: RootState) => state.requests);

  return (
    <div>
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

export default RequestTable;
