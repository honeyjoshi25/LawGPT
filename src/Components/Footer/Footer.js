import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { Instagram, LinkedIn, X } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation("common");
  return (
    <div className=" w-100 mainFooter ">
      <div className="container d-flex flex-column justify-content-center fw-bold pb-5 pt-5 footerCompo">
        <Link to="/" className="link">
          <h3>{t("footer.wkeel")}</h3>
        </Link>
        <div className="d-flex mt-5 justify-content-center">
          <Link
            className="link mx-3"
            to="https://in.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn />
          </Link>
          <Link
            className="link mx-3"
            to="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <X />
          </Link>
          <Link
            className="link mx-3"
            to="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram />
          </Link>
        </div>
        <div className="d-flex mt-5 justify-content-center">
          <Link className="link mx-3">
            <span>{t("footer.support")}</span>
          </Link>
          <Link className="link mx-3" to="/privacy-policy">
            <span>{t("footer.privacyPolicy")}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
