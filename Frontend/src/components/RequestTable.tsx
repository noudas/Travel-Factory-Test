import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

const RequestTable: React.FC = () => {
  const { requests, loading, error } = useSelector((state: RootState) => state.requests);

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
      
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-left">Start Date</th>
              <th className="p-3 text-left">End Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((req, index) => (
                <tr 
                  key={req.id ?? `request-${index}`} 
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{req.reason || "No reason provided"}</td>
                  <td className="p-3">{new Date(req.startDate).toLocaleDateString()}</td>
                  <td className="p-3">{new Date(req.endDate).toLocaleDateString()}</td>
                  <td className="p-3 font-semibold">
                    <span 
                      className={`px-3 py-1 rounded-full text-sm ${
                        req.status === "APPROVED" 
                          ? "bg-green-100 text-green-600" 
                          : req.status === "REJECTED" 
                          ? "bg-red-100 text-red-600" 
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
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
