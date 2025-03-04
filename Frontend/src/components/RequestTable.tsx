import React from "react";

// Define the request type
interface VacationRequest {
  id: number;
  startDate: string;
  endDate: string;
  reason?: string;
  status: string;
}

interface RequestTableProps {
  requests: VacationRequest[];
}

const RequestTable: React.FC<RequestTableProps> = ({ requests }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
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
            {Array.isArray(requests) && requests.length > 0 ? (
              requests.map((req: VacationRequest, index: number) => (
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