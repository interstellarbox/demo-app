import React from "react";
import { observer } from "mobx-react";
import { useStore } from "../../stores/rootStore";
import { statusList } from "../../fixtures/fixtureData";

//Components
import { Modal, Space, Typography, Select } from "antd";
const { Text } = Typography;
const { Option } = Select;

const JobDetailsModal = () => {
  const store = useStore();
  const {
    activeJob,
    hideJobDetails,
    saveJobChanges,
    updateActiveJobStatus,
    saveJobChangesButtonDisabled,
  } = store;

  // do note go further if there is no selected job
  if (!activeJob) return null;

  //format a timestamp into a readable format
  const createdTime = new Date(
    activeJob.createdTimestamp * 1000
  ).toLocaleString();

  return (
    <Modal
      title={activeJob.jobId}
      visible
      okText="Save changes"
      okButtonProps={{ disabled: saveJobChangesButtonDisabled }}
      onCancel={hideJobDetails}
      onOk={saveJobChanges}
    >
      <Space direction="vertical" size="small">
        <Space size="small">
          <Text strong>Status:</Text>
          <Select
            defaultValue={activeJob.status}
            onChange={updateActiveJobStatus}
            style={{ minWidth: 100 }}
          >
            {statusList.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Space>

        {/* 
        We assume that all fields in job details are required by default.
        Otherwise we need to use a conditional rendering 
        or activeJob.client.address?.street etc
        */}

        <Space size="small">
          <Text strong>Created:</Text>
          <Text>{createdTime}</Text>
        </Space>
        <Space size="small">
          <Text strong>Description:</Text>
          <Text>{activeJob.description}</Text>
        </Space>
        <Space size="small">
          <Text strong>Client:</Text>
          <Text>{`${activeJob.client.firstName} ${activeJob.client.lastName}`}</Text>
        </Space>
        <Space size="small">
          <Text strong>Phone:</Text>
          {/* We might want to format phone number here but it's formatted in fixtres by default*/}
          <Text>{activeJob.client.phone || "-"}</Text>
        </Space>
        <Space size="small">
          <Text strong>Address:</Text>
          <Text>{`${activeJob.client.address.street}, ${activeJob.client.address.city}`}</Text>
        </Space>
      </Space>
    </Modal>
  );
};

export default observer(JobDetailsModal);
