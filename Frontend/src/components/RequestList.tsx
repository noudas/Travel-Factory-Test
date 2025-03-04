import React from "react";
import RequestItem from "./RequestItem";

interface RequestListProps {
  requests: any[]; // Replace 'any' with the actual request type
  filter: string;
}

const RequestList: React.FC<RequestListProps> = ({ requests, filter }) => {
  const filteredRequests = requests.filter((req) => filter === "ALL" || req.status === filter);

  return (
    <div>
      {filteredRequests.map((req) => (
        <RequestItem key={req.id} request={req} />
      ))}
    </div>
  );
};

export default RequestList;