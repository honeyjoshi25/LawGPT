import React, { useEffect, useState } from "react";
import "./Chatbot.css";
import { useLocation, useParams } from "react-router-dom";
import { ArrowForward, Menu, Close } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Loader, ThreeDotLoader } from "../../Assets/Loader/Loader";
import Typewriter from "typewriter-effect";
import axios from "axios";
import { BASE_DRAFT, BASE_SEARCH } from "../../Config/Config";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { FiEdit } from "react-icons/fi";

export const Chatbot = () => {
  const location = useLocation();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [followUp, setFollowUp] = useState("");
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    document.title = params.type === "search" ? "AI Search" : "AI Drafting";
  }, [params.type]);

  useEffect(() => {
    setSearchHistory(
      sessionStorage.getItem("searchHistory")
        ? JSON.parse(sessionStorage.getItem("searchHistory"))
        : location.state
    );

    if (location.state) {
      sessionStorage.setItem("searchHistory", JSON.stringify(location.state));
    }

    // Clear sessionStorage when component unmounts
    return () => {
      sessionStorage.clear();
    };
  }, [location.key]);

  const onSearch = async (e) => {
    e.preventDefault();
    const currentIndex = searchHistory.length;
    setLoading(true);
    setLoadingIndex(currentIndex);

    const apiUrl = params.type === "draft" ? BASE_DRAFT : BASE_SEARCH;

    await axios
      .post(apiUrl, {
        conversation_history: searchHistory,
        internet: params.type === "search",
        subscription_type: "student",
        user_country: "kuwait",
        user_input: followUp,
      })
      .then(async (res) => {
        setLoading(false);
        const updatedHistory = [
          ...searchHistory,
          {
            question: followUp,
            answer: res.data,
            apiType: params.type,
          },
        ];
        if (params.type === "draft") {
          let draft = updatedHistory[0]?.answer.split("{");
          updatedHistory[updatedHistory.length] = draft[1];
        }
        setSearchHistory(updatedHistory);
        sessionStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
        setFollowUp("");
        setLoadingIndex(null);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setLoadingIndex(null);
        setFollowUp("");
      });
  };

  const clearChatHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const renderChatItems = () => {
    let historyToRender;
    if (params.type === "draft") {
      historyToRender =
        searchHistory.length > 1 ? searchHistory.slice(0, -1) : searchHistory;
    } else {
      historyToRender = searchHistory;
    }
    return historyToRender?.map((item, index) => (
      <div className="d-flex flex-column gap-2 p-3" key={index}>
        <div className="w-100 d-flex justify-content-end">
          <div className="questionCompo p-3">{item.question}</div>
        </div>
        <div className="w-100 d-flex justify-content-start flex-column gap-2">
          <div className="answerCompo p-3">
            {loadingIndex === index ? (
              <ThreeDotLoader />
            ) : index === historyToRender.length - 1 ? (
              <Typewriter
                options={{
                  strings:
                    params.type === "draft" && item.answer
                      ? item.answer.split("{")[0]
                      : item.answer || "",
                  autoStart: true,
                  delay: 10,
                }}
              />
            ) : (
              <p>
                {params.type === "draft" && item.answer
                  ? item.answer.split("{")[0]
                  : item.answer || ""}
              </p>
            )}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="chatbot w-100 ">
      <div className="historyHeader d-flex d-lg-none w-100 p-3">
        <IconButton onClick={toggleHistory}>
          <Menu className="historyIcon" />
        </IconButton>
      </div>
      {showHistory && (
        <div className="mdHistoryBar">
          <div className="w-100 d-flex justify-content-between p-3 pt-0">
            <Tooltip title="Close">
              <IconButton onClick={toggleHistory}>
                <Close className="historyIcon" />
              </IconButton>
            </Tooltip>
            <Tooltip title="New Chat">
              <IconButton onClick={clearChatHistory}>
                <FiEdit className="historyIcon" />
              </IconButton>
            </Tooltip>
          </div>
          <div className="historyContentCompo">
            <div className="historyContent mt-2 p-3 rounded w-100 d-flex flex-column">
              <span className="text-start">{searchHistory[0]?.question}</span>
              {/* <div className="historyData d-flex justify-content-lg-between align-items-center mt-2 flex-column">
                <div className="d-flex gap-2">
                  <AccessAlarmsOutlined className="historyIcon" />
                  <span>27/06/2024</span>
                </div>
                <IconButton aria-label="delete">
                  <Delete className="historyIcon" />
                </IconButton>
              </div> */}
            </div>
          </div>
        </div>
      )}
      <div className="d-flex flex-row">
        <div className="col-lg-2 d-none d-lg-flex flex-column p-3 draftHistoryCompo">
          <div className="w-100 d-flex justify-content-end">
            <Tooltip title="New Chat">
              <IconButton aria-label="delete">
                <FiEdit className="historyIcon" />
              </IconButton>
            </Tooltip>
          </div>
          <div className="historyContent mt-2 p-3 rounded w-100 d-flex flex-column">
            <span className="text-start">{searchHistory[0]?.question}</span>
            {/* <div className="historyData d-flex justify-content-lg-between align-items-center mt-2 flex-column">
              <div className="d-flex gap-2">
                <AccessAlarmsOutlined className="historyIcon" />
                <span>27/06/2024</span>
              </div>
              <IconButton aria-label="delete">
                <Delete className="historyIcon" />
              </IconButton>
            </div> */}
          </div>
        </div>
        <div className="col-12 col-lg-10 d-flex justify-content-center mt-5 mt-lg-0">
          <div className="chatbot w-75 d-flex flex-column p-3">
            <div className="d-flex  flex-column chatbotCompo  flex-grow-1 overflow-auto gap-2">
              {renderChatItems()}
            </div>
            <form onSubmit={onSearch}>
              <div className="d-flex gap-2 chatbotFollowup">
                <input
                  type="text"
                  className="form-control homeInput "
                  placeholder="Ask follow-up"
                  name="followUp"
                  autoComplete="off"
                  value={followUp}
                  onChange={(e) => setFollowUp(e.target.value)}
                />
                {followUp === "" ? (
                  <Button className="homeBtn" variant="contained" disabled>
                    <ArrowForward />
                  </Button>
                ) : (
                  <Button className="homeBtn" variant="contained" type="submit">
                    {loading ? <Loader /> : <ArrowForward />}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
