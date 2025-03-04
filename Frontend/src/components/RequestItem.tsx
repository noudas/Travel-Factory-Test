import React from "react";
import { Button } from "./Button";

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
  return (
    <div className="border p-2 my-2 flex justify-between items-center">
        <tr key={request.id} className="border">
                <td className="border p-2">{request.userId}</td>
                <td className="border p-2">{request.reason || "No reason provided"}</td>
                <td className="border p-2">{new Date(request.startDate).toLocaleDateString()}</td>
                <td className="border p-2">{new Date(request.endDate).toLocaleDateString()}</td>
                <td className="border p-2 font-semibold">{request.status}</td>
            </tr>
      <div>
        <Button>Approve</Button>
        <Button>Reject</Button>
      </div>
    </div>
  );
};

export default RequestItem;