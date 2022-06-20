import React from "react";
import { observer } from "mobx-react";
import { useStore } from "../../stores/rootStore";

//Components
import { Space, Select, Input, Typography } from "antd";
const { Option } = Select;
const { Title } = Typography;

const JobHeader = () => {
  const store = useStore();
  const { sortDirection, searchQuery, sortJobsByDate, setSearchQuery } = store;
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Title>Job List</Title>
      <Space style={{ width: "100%" }}>
        <Select
          value={sortDirection}
          style={{ minWidth: "100px" }}
          placeholder="Sort by"
          onChange={sortJobsByDate}
        >
          <Option key="desc" value="desc">
            Newest first
          </Option>
          <Option key="asc" value="asc">
            Oldest first
          </Option>
        </Select>
        <Input
          placeholder="Search by jobId"
          defaultValue={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Space>
    </Space>
  );
};

export default observer(JobHeader);
