import React from "react";
import { observer } from "mobx-react";
//Components
import { Typography, Space } from "antd";
import { FileOutlined } from "@ant-design/icons";
const { Text } = Typography;

const NotesInfo = ({ notesNumber, onClick }) => (
  <Space onClick={onClick}>
    <FileOutlined />
    <Text>{notesNumber}</Text>
  </Space>
);

export default observer(NotesInfo);
