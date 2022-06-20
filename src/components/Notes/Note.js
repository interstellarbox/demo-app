import React, { useState } from "react";
import { observer } from "mobx-react";
import { useStore } from "../../stores/rootStore";
//Components
import { Space, Typography, Input } from "antd";
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
const { Text } = Typography;
const { TextArea } = Input;

const Note = ({ note }) => {
  const { description, createdTimestamp, uuid, isNew } = note;

  //format a timestamp into a readable format
  const createdTime = new Date(createdTimestamp * 1000).toLocaleString();

  //set edit mode automatically when we are adding a new note
  const [editMode, setEditMode] = useState(isNew);

  const store = useStore();
  const { deleteNote, updateNote } = store;

  //set the current description as initial for editing
  const [newDescription, setNewDescription] = useState(description);

  const handleUpdateNode = () => {
    updateNote(uuid, newDescription);
    setEditMode(false);
  };

  return (
    <Space direction="vertical" size="small" style={{ width: "100%" }}>
      <Space direction="horizontal" size="large">
        <Text strong>{createdTime}</Text>
        {editMode ? (
          <SaveOutlined onClick={handleUpdateNode} />
        ) : (
          <EditOutlined
            onClick={() => {
              setEditMode(true);
            }}
          />
        )}
        <DeleteOutlined onClick={() => deleteNote(note.uuid)} />
      </Space>
      {editMode ? (
        <TextArea
          rows={4}
          defaultValue={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
      ) : (
        <Text>{description}</Text>
      )}
    </Space>
  );
};

export default observer(Note);
