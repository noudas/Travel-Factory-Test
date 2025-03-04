import React from "react";
import { Button } from "./Button";

interface RequestItemProps {
  request: {
    id: number;
    startDate: string;
    endDate: string;
    status: string;
  };
}

const RequestItem: React.FC<RequestItemProps> = ({ request }) => {
  return (
    <div className="border p-2 my-2 flex justify-between items-center">
      <span>
        {request.startDate} - {request.endDate} | {request.status}
      </span>
      <div>
        <Button>Approve</Button>
        <Button>Reject</Button>
      </div>
    </div>
  );
};

export default RequestItem;