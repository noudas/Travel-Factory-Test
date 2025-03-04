import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "./Button";
import { approveRequest, rejectRequest, fetchAllRequests } from "../redux/slices/vacationSlice";
import { AppDispatch } from "../redux/store/store";

interface RequestItemProps {
  request: {
    id: number;
    userId: number;
    reason: string;
    comments?: string;
    startDate: string;
    endDate: string;
    status: string;
  };
}

const RequestItem: React.FC<RequestItemProps> = ({ request }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [rejectionReason, setRejectionReason] = useState("");

  const handleApprove = async () => {
    await dispatch(approveRequest(request.id));
    dispatch(fetchAllRequests());
  };

  const handleReject = async () => {
    await dispatch(rejectRequest(request.id));
    dispatch(fetchAllRequests());
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 my-3 border border-gray-200">
      <div className="mb-3">
        <p className="text-gray-700 font-medium">{request.reason || "No reason provided"}</p>
        <p className="text-gray-500 text-sm">
          {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
        </p>
        {request.comments && <p className="text-red-500 text-sm">Rejection Reason: {request.comments}</p>}
        <p className={`mt-2 font-semibold text-sm ${request.status === "APPROVED" ? "text-green-500" : request.status === "REJECTED" ? "text-red-500" : "text-yellow-500"}`}>
          {request.status}
        </p>
      </div>

      {/* Rejection Reason Input */}
      {request.status !== "APPROVED" && (
        <div className="mb-3">
          <input
            type="text"
            placeholder="Reason for rejection (optional)"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button onClick={handleApprove} className="bg-green-500 hover:bg-green-600">
          Approve
        </Button>
        <Button onClick={handleReject} className="bg-red-500 hover:bg-red-600">
          Reject
        </Button>
      </div>
    </div>
  );
};

export default RequestItem;
