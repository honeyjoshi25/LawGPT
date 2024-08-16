import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { Button } from "@mui/material";
import {
  KeyboardBackspace,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import google from "../../Assets/Logos/google.svg";
import MenuItem from "@mui/material/MenuItem";
import { RegExp } from "../../Helpers/RegExp";
import { useTranslation } from "react-i18next";
import { HeaderContext } from "../../Context/Context";
import { BASE_URL } from "../../Config/Config";
import axios from "axios";
import { Loader } from "../../Assets/Loader/Loader";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Menu } from "@mui/material";

export const Login = () => {
  const { t, i18n } = useTranslation("login");

  useEffect(() => {
    document.title = t("docTitle");
  }, [t]);
  const navigate = useNavigate();
  const regex = RegExp.REACT_APP_EMAILREGEX;
  const { isArabic, setIsArabic } = useContext(HeaderContext);

  const [visibility, setVisibility] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [anchorEl3, setAnchorEl3] = useState(null);

  const lng = localStorage.getItem("lng") ? localStorage.getItem("lng") : "en";

  const open3 = Boolean(anchorEl3);
  const handleClick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleClose3 = () => {
    setAnchorEl3(null);
  };

  const handleSnackbar = () => setSnackbar(false);

  const onChange = (e) => {
    let { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsArabic(!isArabic);
    localStorage.setItem("lng", lng);
    handleClose3();
  };

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language]);

  const validate = (formValues) => {
    const errors = {};
    if (!formValues.email) {
      errors.email = t("errors.emailRequired");
    } else if (!regex.test(formValues.email)) {
      errors.email = t("errors.emailInvalid");
    }
    if (formValues.password?.trim().length === 0) {
      errors.password = t("errors.passwordRequired");
    }
    return errors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(values);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);

      await axios
        .post(BASE_URL + "auth/login", {
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          setSnackbar(true);
          setErrorMsg(false);
          setMessage(res.data.message);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("token", res.data.token);
          setTimeout(() => {
            setLoading(false);
            navigate("/");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          setSnackbar(true);
          setErrorMsg(true);

          if (err.response) {
            setMessage(err.response.data.message);
          } else {
            setMessage(err.message);
          }
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        });
    }
  };

  return (
    <div className="login w-100 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center w-100 p-3 loginHeader">
        <Button
          className="loginBackButton"
          onClick={() => navigate("/")}
          variant="contained"
        >
          <KeyboardBackspace />
        </Button>
        <h4 className="m-3" onClick={() => navigate("/")}>
          {t("wkeel")}
        </h4>
      </div>
      <div className="w-100 d-flex loginCompo justify-content-center">
        <div className="loginForm w-50 d-flex flex-column justify-content-center align-items-center p-5 pt-0">
          <h2>{t("welcomeBack")}</h2>
          <span>{t("loginIntoYourAccount")}</span>
          <form className="w-75" onSubmit={onSubmit}>
            <div className="loginFormCompo mt-4 d-flex flex-column justify-content-center align-items-center">
              <Button className="loginBackButton" variant="contained">
                <img src={google} alt="google" width={18} />
              </Button>
              <div className="d-flex w-75 mt-3 align-items-center justify-content-center">
                <hr className="col" />
                <span className="col">{t("orContinueWith")}</span>
                <hr className="col" />
              </div>
              <div className="mt-3 w-75">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control authInput"
                    placeholder={t("emailPlaceholder")}
                    name="email"
                    value={values.email}
                    onChange={onChange}
                    autoComplete="off"
                  />
                  <div
                    className={
                      "w-100 " + (isArabic ? " text-end" : " text-start")
                    }
                  >
                    <span className="text-danger" style={{ fontSize: "12px" }}>
                      {formErrors.email}
                    </span>
                  </div>
                </div>
                <div className="mb-1">
                  <div
                    className={`input-group ${
                      isArabic ? "text-end" : "text-start"
                    }`}
                  >
                    <input
                      type={!visibility ? "password" : "text"}
                      className="form-control authInput passwordInput"
                      placeholder={t("passwordPlaceholder")}
                      name="password"
                      value={values.password}
                      onChange={onChange}
                    />
                    <span
                      className="input-group-text authInputGroup"
                      onClick={() => setVisibility(!visibility)}
                    >
                      {!visibility ? (
                        <VisibilityOutlined />
                      ) : (
                        <VisibilityOffOutlined />
                      )}
                    </span>
                  </div>
                  <div
                    className={
                      "w-100 " + (isArabic ? " text-end" : " text-start")
                    }
                  >
                    <span className="text-danger" style={{ fontSize: "12px" }}>
                      {formErrors.password}
                    </span>
                  </div>
                </div>

                <div
                  className="d-flex justify-content-end mb-4 "
                  onClick={() => navigate("/recover-password")}
                >
                  <span className="recoverPassLink">
                    {t("recoverPassword")}
                  </span>
                </div>

                <Button
                  className="w-100 loginbtn "
                  variant="contained"
                  type="submit"
                >
                  {loading ? <Loader /> : t("logIn")}
                </Button>
              </div>
              <span className="mt-4 fw-bold">
                {t("dontHaveAccount")}&nbsp;
                <span
                  className="recoverPassLink"
                  onClick={() => navigate("/signup")}
                >
                  {t("signUp")}
                </span>
              </span>
            </div>
          </form>
        </div>
      </div>

      <div className="w-100 d-flex justify-content-start position-fixed bottom-0 mb-3 p-3">
        <Button
          id="basic-button"
          aria-controls={open3 ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open3 ? "true" : undefined}
          onClick={handleClick3}
          className="loginLang p-2"
        >
          {lng === "en" && !isArabic ? t("english") : t("arabic")}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl3}
          open={open3}
          onClose={handleClose3}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          PaperProps={{
            style: {
              width: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        >
          {lng === "en" && !isArabic ? (
            <MenuItem onClick={() => changeLanguage("ar")}>
              {t("arabic")}
            </MenuItem>
          ) : (
            <MenuItem onClick={() => changeLanguage("en")}>
              {t("english")}
            </MenuItem>
          )}
        </Menu>
      </div>
      <Snackbar
        open={snackbar}
        autoHideDuration={2000}
        onClose={handleSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={errorMsg ? "error" : "success"}
          sx={{ width: "100%" }}
          onClose={handleSnackbar}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
