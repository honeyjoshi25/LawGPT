import React, { useContext, useState } from "react";
import { AiSearchContext } from "../../Context/Context";
import { ArrowForward } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Loader, ThreeDotLoader } from "../../Assets/Loader/Loader";
import Typewriter from "typewriter-effect";
import axios from "axios";
import { BASE_SEARCH, BASE_DRAFT } from "../../Config/Config";

export const ChatBot = ({ apiType }) => {
  const { loading, setLoading, searchHistory, setSearchHistory } =
    useContext(AiSearchContext);
  const [followUp, setFollowUp] = useState("");
  const [loadingIndex, setLoadingIndex] = useState(null);

  const onSearch = async (e) => {
    e.preventDefault();
    const currentIndex = searchHistory.length;
    setLoading(true);
    setLoadingIndex(currentIndex);

    const apiUrl = apiType === "draft" ? BASE_DRAFT : BASE_SEARCH;

    await axios
      .post(apiUrl, {
        conversation_history: searchHistory,
        internet: apiType === "search",
        subscription_type: "student",
        user_country: "kuwait",
        user_input: followUp,
      })
      .then(async (res) => {
        setLoading(false);
        setSearchHistory([
          ...searchHistory,
          {
            question: followUp,
            answer: res.data,
            apiType: apiType,
          },
        ]);
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

  return (
    <div>
      <div className="chatbot w-75 d-flex flex-column">
        <div className="d-flex  flex-column chatbotCompo  flex-grow-1 overflow-auto gap-2 mb-3">
          {searchHistory?.length > 0
            ? searchHistory.map((i, index) => {
                return (
                  <div className="d-flex flex-column gap-2 p-3" key={index}>
                    <div className="w-100 d-flex justify-content-end">
                      <div className="questionCompo p-3">{i.question}</div>
                    </div>
                    <div className="w-100 d-flex justify-content-start flex-column gap-2">
                      <div className="answerCompo p-3">
                        {loadingIndex === index ? (
                          <ThreeDotLoader />
                        ) : index === searchHistory.length - 1 ? (
                          <Typewriter
                            // onInit={(typewriter) => {
                            //   typewriter.typeString(i.answer).start();
                            // }}
                            options={{
                              strings: i.answer,
                              autoStart: true,
                              delay: 50,
                            }}
                          />
                        ) : (
                          <p>{i.answer}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
        <form onSubmit={onSearch}>
          <div className="d-flex gap-2 chatbotFollowup mt-auto">
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
  );
};
