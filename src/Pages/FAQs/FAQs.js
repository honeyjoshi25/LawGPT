import React, { useEffect, useContext } from "react";
import "./FAQs.css";
import { Header } from "../../Components/Header/Header";
import { Footer } from "../../Components/Footer/Footer";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTranslation } from "react-i18next";
import { FAQsData } from "./FAQsData";
import { HeaderContext } from "../../Context/Context";

export const FAQs = () => {
  const { t } = useTranslation("faq");
  const { isArabic } = useContext(HeaderContext);

  useEffect(() => {
    document.title = t("docTitle");
  }, [t]);

  const firstColumn = FAQsData?.slice(0, 6);
  const secondColumn = FAQsData?.slice(6, 11);

  return (
    <div className="faqs w-100 d-flex flex-column">
      <Header />
      <div className="mainContainer">
        <div className="faqHeader p-5 d-flex justify-content-center align-items-center">
          <h1 className="fw-bold">
            {t("header.line1")} <br /> {t("header.line2")}
          </h1>
        </div>
        <div className="container p-5 d-flex flex-lg-row flex-column gap-2">
          <div className="col-lg-6 col-12 d-flex flex-column gap-2">
            {firstColumn.map((item, index) => (
              <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                  aria-controls={`panel${index + 1}-content`}
                  id={`panel${index + 1}-header`}
                className="p-3 faqAccordion"
              >
                  <h6
                    className={
                      "w-75" + (isArabic ? " text-end" : " text-start")
                    }
                  >
                    {t(`questions.${index}.question`)}
                </h6>
              </AccordionSummary>
              <AccordionDetails>
                  <p className={isArabic ? "text-end" : "text-start"}>
                    {t(`questions.${index}.answer`)}
                </p>
              </AccordionDetails>
            </Accordion>
            ))}
          </div>
          <div className="col-lg-6 col-12 d-flex flex-column gap-2">
            {secondColumn.map((item, index) => (
              <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                  aria-controls={`panel${index + 7}-content`}
                  id={`panel${index + 7}-header`}
                className="p-3 faqAccordion"
              >
                  <h6
                    className={
                      "w-75" + (isArabic ? " text-end" : " text-start")
                    }
                  >
                    {t(`questions.${index + 6}.question`)}
                </h6>
              </AccordionSummary>
              <AccordionDetails>
                  <p className={isArabic ? "text-end" : "text-start"}>
                    {t(`questions.${index + 6}.answer`)}
                </p>
              </AccordionDetails>
            </Accordion>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
