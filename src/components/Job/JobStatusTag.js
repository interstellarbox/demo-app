import React from "react";
//Components
import { Tag } from "antd";

const JobStatusTag = ({ status }) => {
  const getTagColor = (status) => {
    switch (status) {
      case "Scheduled":
        return "blue";
      case "Active":
        return "purple";
      case "Invoicing":
        return "orange";
      case "To priced":
        return "volcano";
      case "Completed":
        return "green";

      default:
        return "blue";
    }
  };
  return <Tag color={getTagColor(status)}>{status}</Tag>;
};

export default JobStatusTag;
