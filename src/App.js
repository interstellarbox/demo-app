import React from "react";
//UI library styles
import "antd/dist/antd.min.css";

//Components
import { Row, Col, Space } from "antd";
import JobHeader from "./components/Job/JobHeader";
import JobList from "./components/Job/JobList";
import JobDetailsModal from "./components/Job/JobDetailsModal";
import NotesModal from "./components/Notes/NotesModal";

const App = () => {
  return (
    <Row justify="center">
      <Col xs={20} md={12}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <JobHeader />
          <JobList />
        </Space>
        <JobDetailsModal />
        <NotesModal />
      </Col>
    </Row>
  );
};

export default App;
