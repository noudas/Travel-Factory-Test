import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "./Button";
import { approveRequest, rejectRequest, fetchAllRequests } from "../redux/slices/vacationSlice";
import { AppDispatch } from "../redux/store/store";

interface RequestItemProps {
  request: {
    id: number;
    userId: number;
    reason: string;
    startDate: string;
    endDate: string;
    status: string;
  };
}

const RequestItem: React.FC<RequestItemProps> = ({ request }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleApprove = async () => {
    await dispatch(approveRequest(request.id));
    dispatch(fetchAllRequests()); // Fetch updated requests after approving
  };

  const handleReject = async () => {
    await dispatch(rejectRequest(request.id));
    dispatch(fetchAllRequests()); // Fetch updated requests after rejecting
  };

  return (
    <div className="border p-2 my-2 flex justify-between items-center">
      <div>
        <p>{request.userId}</p>
        <p>{request.reason || "No reason provided"}</p>
        <p>{new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}</p>
        <p className="font-semibold">{request.status}</p>
      </div>
      <div className="space-x-2">
        <Button onClick={handleApprove}>Approve</Button>
        <Button onClick={handleReject}>Reject</Button>
      </div>
    </div>
  );
};

export default RequestItem;
