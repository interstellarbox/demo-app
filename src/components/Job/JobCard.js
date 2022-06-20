import React from "react";
import { observer } from "mobx-react";
import { useStore } from "../../stores/rootStore";
//Components
import { Card, Typography, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import JobCardNotesInfo from "./JobCardNotesInfo";
import JobStatusTag from "./JobStatusTag";
const { Text } = Typography;

const JobCard = ({ job }) => {
  //format a timestamp into a readable format
  const createdTime = new Date(job.createdTimestamp * 1000).toLocaleString();
  const store = useStore();
  const { showJobDetails, showNotes } = store;

  return (
    <Card
      key={job.uuid}
      title={job.jobId}
      extra={<JobStatusTag status={job.status} />}
      actions={[
        <JobCardNotesInfo
          notesNumber={job.notes.length}
          onClick={() => showNotes(job.notes, job.jobId)}
        />,
        <EditOutlined onClick={() => showJobDetails(job)} />,
      ]}
    >
      {/* 
        We assume that all fields in job details are required by default.
        Otherwise we need to use a conditional rendering 
        or job.client.address?.street etc
        */}

      <Space direction="vertical" size="small">
        <Text>{createdTime}</Text>
        <Text>{job.description}</Text>
        <Space size="small">
          <Text strong>{"Address:"}</Text>
          <Text>{`${job.client.address?.street}, ${job.client.address?.city}`}</Text>
        </Space>
      </Space>
    </Card>
  );
};

export default observer(JobCard);
