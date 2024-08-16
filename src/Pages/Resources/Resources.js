import React, { useContext, useEffect } from "react";
import "./Resources.css";
import { Header } from "../../Components/Header/Header";
import { Footer } from "../../Components/Footer/Footer";
import { ResourcesData } from "./ResourcesData";
import { useTranslation } from "react-i18next";
import { HeaderContext } from "../../Context/Context";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const Resources = () => {
  const { t } = useTranslation("resources");
  const { isArabic } = useContext(HeaderContext);

  useEffect(() => {
    document.title = t("docTitle");
  }, [t]);

  return (
    <div className="resources w-100 d-flex flex-column">
      <Header />
      <div className="mainContainer">
        <div className="resourcesHeader p-5 d-flex justify-content-center align-items-center flex-column">
          <h5>{t("header")}</h5>
          <h1 className="fw-bold">{t("title")}</h1>
          <h6 className="w-50 mt-2">{t("description")}</h6>
        </div>
        <div className="resourcesContainer">
          <div className="container pt-5 pb-5 d-flex overflow-auto">
            {ResourcesData?.map((i, index) => (
              <motion.div
                className="col-12 col-lg-4 p-3"
                key={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                viewport={{ once: true, amount: 0.2 }} // Trigger when 20% is in view
              >
                  <div className="card resourcesCard p-5">
                  <h5 className={isArabic ? "text-end" : "text-start"}>
                    {index + 1}
                  </h5>
                  <h5 className={isArabic ? "text-end" : "text-start"}>
                    {t(`data.${index}.title`)}
                  </h5>
                  <p className="mt-4">{t(`data.${index}.desc`)}</p>
                  </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
