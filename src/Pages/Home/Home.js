import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./Home.css";
import { Header } from "../../Components/Header/Header";
import homeLanding from "../../Assets/Images/banner.png";
import automate from "../../Assets/Images/automated.png";
import draftLegal from "../../Assets/Images/drafting.png";
import modifyDraft from "../../Assets/Images/docEdit.png";
import retrive from "../../Assets/Images/legalData.png";
import aiPower from "../../Assets/Images/power.png";
import { HeaderContext } from "../../Context/Context";

export const Home = () => {
  const { isArabic } = useContext(HeaderContext);
  const { t } = useTranslation("home");

  useEffect(() => {
    document.title = t("docTitle");
  }, [t]);

  return (
    <div className="home w-100">
      <Header />
      <div className="homeContainer container mt-3 w-100 d-flex flex-column justify-content-center align-items-center">
        <motion.div
          className="d-flex justify-content-between align-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <motion.div
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              className={
                "fw-bold w-75" + (isArabic ? " text-end" : " text-start")
              }
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {t("title")} &nbsp;
              <span className="fw-bold">{t("legalSearch")}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className={
                "mt-4 homePara w-75" + (isArabic ? " text-end" : " text-start")
              }
            >
              {t("subtitle")}
            </motion.p>
          </motion.div>

          <motion.img
            alt="home"
            src={homeLanding}
            className="d-none d-lg-block w-50"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
        </motion.div>
        <motion.div
          className="features w-100 d-flex justify-content-md-around flex-md-row flex-column mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            className="col-12 col-md-4 p-3"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
          >
            <div className="feature-card d-flex flex-column justify-content-center align-items-center">
              <img alt="homeCardImg" src={automate} />
              <h5 className="fw-bold w-75">
                {t("automatedContractClauseGeneration")}
              </h5>
              <p>{t("automatedContractClauseGenerationDescription")}</p>
            </div>
          </motion.div>
          <motion.div
            className="col-12 col-md-4 p-3"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 1.7, ease: "easeOut" }}
          >
            <div className="feature-card d-flex flex-column justify-content-center align-items-center">
              <img alt="homeCardImg" src={draftLegal} />
              <h5 className="fw-bold w-75">{t("documentDrafting")}</h5>
              <p>{t("documentDraftingDescription")}</p>
            </div>
          </motion.div>
          <motion.div
            className="col-12 col-md-4 p-3"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 1.9, ease: "easeOut" }}
          >
            <div className="feature-card d-flex flex-column justify-content-center align-items-center">
              <img alt="homeCardImg" src={modifyDraft} />
              <h5 className="fw-bold w-75">{t("documentModification")}</h5>
              <p>{t("documentModificationDescription")}</p>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          className="features w-100 d-flex justify-content-md-around flex-md-row flex-column mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            className="col-12 col-md-6 p-3"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 2.1, ease: "easeOut" }}
          >
            <div className="feature-card secondCardrow d-flex flex-column justify-content-center align-items-center">
              <img alt="homeCardImg" src={aiPower} />
              <h5 className="fw-bold w-50 text-center">
                {t("aiPoweredSearch")}
              </h5>
              <p className="w-75">{t("aiPoweredSearchDescription")}</p>
            </div>
          </motion.div>
          <motion.div
            className="col-12 col-md-6 p-3"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 2.3, ease: "easeOut" }}
          >
            <div className="feature-card secondCardrow d-flex flex-column justify-content-center align-items-center">
              <img alt="homeCardImg" src={retrive} />
              <h5 className="fw-bold w-50 text-center">
                {t("accessToLatestLegalData")}
              </h5>
              <p className="w-75">{t("accessToLatestLegalDataDescription")}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
