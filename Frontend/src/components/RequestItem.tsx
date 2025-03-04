import React from "react";
import { approveRequest, rejectRequest } from "../redux/slices/vacationSlice";
import { Button } from "./Button";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store/store";

interface RequestItemProps {
  request: {
    id: number;
    userId: number;
    reason: string;
    startDate: string;
    endDate: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
  };
}

  const RequestItem: React.FC<RequestItemProps> = ({ request }) => {
    const dispatch = useDispatch<AppDispatch>();

  const handleApprove = () => {
    dispatch(approveRequest(request.id));
  };

  const handleReject = () => {
    dispatch(rejectRequest(request.id));
  };

  return (
    <div className="border p-2 my-2 flex justify-between items-center">
      <table className="min-w-full">
        <tbody>
          <tr className="border">
            <td className="border p-2">{request.userId}</td>
            <td className="border p-2">{request.reason || "No reason provided"}</td>
            <td className="border p-2">{new Date(request.startDate).toLocaleDateString()}</td>
            <td className="border p-2">{new Date(request.endDate).toLocaleDateString()}</td>
            <td className="border p-2 font-semibold">{request.status}</td>
          </tr>
        </tbody>
      </table>
      {request.status === "PENDING" && (
        <div className="flex gap-2">
          <Button onClick={handleApprove} className="bg-green-500 hover:bg-green-600">
            Approve
          </Button>
          <Button onClick={handleReject} className="bg-red-500 hover:bg-red-600">
            Reject
          </Button>
        </div>
      )}
    </div>
  );
};

export default RequestItem;
