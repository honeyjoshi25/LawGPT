import React, { useEffect, useState, useContext } from "react";
import "./Company.css";
import { Header } from "../../Components/Header/Header";
import { Footer } from "../../Components/Footer/Footer";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import company from "../../Assets/Images/companyImg.png";
import {
  Gavel,
  WorkOutline,
  RocketLaunch,
  Handshake,
  MenuBook,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { HeaderContext } from "../../Context/Context";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const Company = () => {
  const { t } = useTranslation("company");
  const { isArabic } = useContext(HeaderContext);
  useEffect(() => {
    document.title = t("docTitle");
  }, [t]);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // useInView hook to detect when elements are in view
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true, // Trigger animation once
    threshold: 0.2, // Trigger when 20% of the element is in view
  });

  const { ref: imageRef, inView: imageInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: iconsRef, inView: iconsInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div className="company w-100 d-flex flex-column">
      <Header />
      <div className="mainContainer w-100">
        <div
          className="companyHeader p-5 d-flex justify-content-center align-items-center w-100"
          ref={headerRef} // Apply ref to the element you want to observe
        >
          <motion.h1
            className="fw-bold"
            initial={{ opacity: 0, y: 50 }}
            animate={
              headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.5 }}
          >
            {t("header")}
          </motion.h1>
        </div>
        <div className="container p-5 d-flex flex-column pb-5 pb-lg-0">
          <div className="d-flex flex-column flex-lg-row gap-5">
            <div className="col-lg-6 col-12 companyIntro">
              <motion.h1
                className={
                  "fw-bold " + (isArabic ? " text-end" : " text-start")
                }
                initial={{ opacity: 0, x: -50 }}
                animate={
                  headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
                }
                transition={{ duration: 0.5 }}
              >
                {t("introTitle")}
              </motion.h1>
              <motion.p
                className="mt-5 fw-bold"
                initial={{ opacity: 0 }}
                animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {t("introText")}
              </motion.p>
            </div>
            <div className="col-lg-6 col-12">
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                className="p-3"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <motion.h6
                    className="text-start"
                    initial={{ opacity: 0 }}
                    animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {t("accordion.lawyers.summary")}
                  </motion.h6>
                </AccordionSummary>
                <AccordionDetails>
                  <motion.p
                    className={isArabic ? "text-end" : "text-start"}
                    initial={{ opacity: 0 }}
                    animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {t("accordion.lawyers.details")}
                  </motion.p>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
                className="p-3"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                  <motion.h6 className="text-start">
                    {t("accordion.students.summary")}
                  </motion.h6>
                </AccordionSummary>
                <AccordionDetails>
                  <motion.p className={isArabic ? "text-end" : "text-start"}>
                    {t("accordion.students.details")}
                  </motion.p>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
                className="p-3"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3bh-content"
                  id="panel3bh-header"
                >
                  <motion.h6 className="text-start">
                    {t("accordion.business.summary")}
                  </motion.h6>
                </AccordionSummary>
                <AccordionDetails>
                  <motion.p className={isArabic ? "text-end" : "text-start"}>
                    {t("accordion.business.details")}
                  </motion.p>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel4"}
                onChange={handleChange("panel4")}
                className="p-3"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <motion.h6 className="text-start">
                    {t("accordion.managers.summary")}
                  </motion.h6>
                </AccordionSummary>
                <AccordionDetails>
                  <motion.p className={isArabic ? "text-end" : "text-start"}>
                    {t("accordion.managers.details")}
                  </motion.p>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
          <div className="d-flex flex-lg-row mt-5 gap-4">
            <div
              className="col-lg-6 d-none d-lg-block companySideImg"
              ref={imageRef} // Apply ref to the element you want to observe
            >
              <motion.img
                src={company}
                alt="company"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  imageInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="col-12 col-lg-6">
              <div
                className={
                  "d-flex flex-column companyProfession ps-0 ps-lg-4" +
                  (isArabic ? " text-end" : " text-start")
                }
                ref={iconsRef} // Apply ref to the element you want to observe
              >
                <motion.h5
                  className="fw-bold companyH5"
                  initial={{ opacity: 0 }}
                  animate={iconsInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {t("designedWithYouInMind")}
                </motion.h5>
                <motion.div
                  className="d-flex flex-column gap-3 mt-3 companyProfession"
                  initial={{ opacity: 0 }}
                  animate={iconsInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="d-flex align-items-center gap-2 w-100">
                    <div className="companyProfessionIcon d-flex justify-content-center align-items-center rounded">
                      <Gavel />
                    </div>
                    <span>{t("professions.lawyers")}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 w-100">
                    <div className="companyProfessionIcon d-flex justify-content-center align-items-center rounded">
                      <WorkOutline />
                    </div>
                    <span>{t("professions.managers")}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 w-100">
                    <div className="companyProfessionIcon d-flex justify-content-center align-items-center rounded">
                      <RocketLaunch />
                    </div>
                    <span>{t("professions.founders")}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 w-100">
                    <div className="companyProfessionIcon d-flex justify-content-center align-items-center rounded">
                      <MenuBook />
                    </div>
                    <span>{t("professions.students")}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 w-100">
                    <div className="companyProfessionIcon d-flex justify-content-center align-items-center rounded">
                      <Handshake />
                    </div>
                    <span>{t("professions.counsels")}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
