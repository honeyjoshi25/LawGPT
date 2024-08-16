import React, { useContext, useEffect } from "react";
import "./PrivacyPolicy.css";
import { Header } from "../../Components/Header/Header";
import { Footer } from "../../Components/Footer/Footer";
import { PolicyDesc } from "./Policies";
import { useTranslation } from "react-i18next";
import { HeaderContext } from "../../Context/Context";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const PrivacyPolicy = () => {
  const { t } = useTranslation("privacy_policy");
  const { isArabic } = useContext(HeaderContext);
  useEffect(() => {
    document.title = t("docTitle");
  }, [t]);

  // useInView hook to detect when elements are in view
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation once
    threshold: 0.2, // Trigger when 20% of the element is in view
  });

  return (
    <div className="privacyPolicy w-100 d-flex flex-column">
      <Header />
      <div className="mainContainer">
        <div
          className="privacyPolicyHeader p-5 d-flex justify-content-center align-items-center"
          ref={ref} // Apply ref to the element you want to observe
        >
          <motion.h1
            className="fw-bold"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            {t("header.title")}
          </motion.h1>
        </div>
        <div className="container mt-5 w-100 d-flex justify-content-center align-items-center">
          <div className="policyDescCompo ps-5 pe-5">
            {PolicyDesc?.map((item, index) => (
              <section id={item.id} className="mb-5" key={index}>
                  <div
                    className={
                      "policyDesc " + (isArabic ? " text-end" : " text-start")
                    }
                  >
                  <motion.h5
                    className="fw-bold"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {t(`${item.id}.title`)}
                  </motion.h5>
                  <motion.p
                    className="mt-3"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {t(`${item.id}.desc`)}
                  </motion.p>
                  </div>
                </section>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
