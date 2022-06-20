import React from "react";
import { observer } from "mobx-react";
import { useStore } from "../../stores/rootStore";

//Components
import { Modal, Space, Button, Typography } from "antd";
import Note from "./Note";

const { Text } = Typography;

const NotesModal = () => {
  const store = useStore();
  const {
    activeNotes,
    activeNotesJobId,
    hideNotes,
    saveNotesChanges,
    addNewNote,
    saveNotesChangesButtonDisabled,
  } = store;

  // do note go further if there is no selected notes
  if (!activeNotes) return null;

  const hasNotes = activeNotes.length;

  return (
    <Modal
      title={`${activeNotesJobId} - Notes`}
      visible
      okText="Save changes"
      okButtonProps={{ disabled: saveNotesChangesButtonDisabled }}
      onCancel={hideNotes}
      onOk={saveNotesChanges}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {!hasNotes ? (
          <Text strong>No notes.</Text>
        ) : (
          activeNotes.map((note) => {
            return <Note key={note.uuid} note={note} />;
          })
        )}
        <Button onClick={addNewNote}>Add Note</Button>
      </Space>
    </Modal>
  );
};

export default observer(NotesModal);
