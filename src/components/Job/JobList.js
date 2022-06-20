import React from "react";
import { observer } from "mobx-react";
import { useStore } from "../../stores/rootStore";

//Components
import { Space, Typography } from "antd";
import JobCard from "./JobCard";

const { Text } = Typography;

const JobsList = () => {
  const store = useStore();
  const { filtredJobs, hasFiltredJobs } = store;

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        display: "flex",
      }}
    >
      {hasFiltredJobs ? (
        filtredJobs.map((job) => {
          return <JobCard key={job.uuid} job={job} />;
        })
      ) : (
        <Text strong>No jobs found</Text>
      )}
    </Space>
  );
};

export default observer(JobsList);
