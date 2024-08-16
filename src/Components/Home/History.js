import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import {
  AddCircleOutlineOutlined,
  ListOutlined,
  AccessAlarmsOutlined,
  Delete,
} from "@mui/icons-material";
import { AiSearchContext } from "../../Context/Context";

export const HistoryCompo = () => {
  const { clearChatHistory } = useContext(AiSearchContext);
  return (
    <div>
      <div className="draftHistoryCompo rounded p-2 mt-3">
        <Button
          className="w-100 newChatBtn"
          variant="outlined"
          endIcon={<AddCircleOutlineOutlined className="homeIcon" />}
          onClick={clearChatHistory}
        >
          New Chat
        </Button>
        <div className="historyContent mt-2 p-3 rounded w-100 d-flex flex-column">
          <span className="text-start">rent agreement</span>
          <div className="historyData d-flex justify-content-between align-items-center mt-2">
            <div className="d-flex gap-2">
              <ListOutlined className="historyIcon" />
              <span>2</span>
            </div>
            <div className="d-flex gap-2">
              <AccessAlarmsOutlined className="historyIcon" />
              <span>27/06/2024</span>
            </div>
            <IconButton aria-label="delete">
              <Delete className="historyIcon" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};
