import React, { useEffect } from "react";
import "./AboutUs.css";
import { Header } from "../../Components/Header/Header";
import { Footer } from "../../Components/Footer/Footer";
import {
  AutoStories,
  FavoriteBorderOutlined,
  OutlinedFlag,
  GradeOutlined,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.3,
      ease: "easeOut",
    },
  },
};

export const AboutUs = () => {
  const { t } = useTranslation("aboutus");

  useEffect(() => {
    document.title = t("docTitle");
  }, [t]);

  return (
    <div className="aboutUs w-100 d-flex flex-column">
      <Header />
      <div className="mainContainer">
        <div className="aboutUsHeader p-5 d-flex justify-content-center align-items-center flex-column">
          <h5>{t("header")}</h5>
          <h1 className="fw-bold w-50">{t("title")}</h1>
        </div>
        <div className="container p-5 d-flex flex-column gap-2">
          <motion.div
            className="d-flex flex-column flex-lg-row"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <motion.div
              className="p-3 col-lg-8 col-12 rounded"
              variants={cardVariants}
            >
              <div className="aboutusCard p-5">
                <div className="cardHeader d-flex justify-content-start gap-3">
                  <AutoStories className="aboutUsIcon" />
                  <h4 className="fw-bold">{t("ourStory.title")}</h4>
                </div>
                <p className="cardBody mt-3">{t("ourStory.body")}</p>
              </div>
            </motion.div>
            <motion.div
              className="p-3 col-lg-4 col-12 rounded"
              variants={cardVariants}
            >
              <div className="aboutusCard p-5">
                <div className="cardHeader d-flex justify-content-start gap-3">
                  <FavoriteBorderOutlined className="aboutUsIcon" />
                  <h4 className="fw-bold">{t("ourValues.title")}</h4>
                </div>
                <p className="cardBody mt-3 text-center">
                  {t("ourValues.body")
                    .split("\n")
                    .map((line, index) => (
                      <p key={index}>
                        {line}
                        <br />
                      </p>
                    ))}
                </p>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            className="d-flex flex-column flex-lg-row"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <motion.div
              className="p-3 col-lg-5 col-12 rounded"
              variants={cardVariants}
            >
              <div className="aboutusCard p-5">
                <div className="cardHeader d-flex justify-content-start gap-3">
                  <GradeOutlined className="aboutUsIcon" />
                  <h4 className="fw-bold">{t("ourVision.title")}</h4>
                </div>
                <p className="cardBody mt-3">{t("ourVision.body")}</p>
              </div>
            </motion.div>
            <motion.div
              className="p-3 col-lg-7 col-12 rounded"
              variants={cardVariants}
            >
              <div className="aboutusCard p-5">
                <div className="cardHeader d-flex justify-content-start gap-3">
                  <OutlinedFlag className="aboutUsIcon" />
                  <h4 className="fw-bold">{t("ourMission.title")}</h4>
                </div>
                <p className="cardBody mt-3">{t("ourMission.body")}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
