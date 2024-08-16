import React, { useEffect, useState, useContext } from "react";
import "./RecoverPassword.css";
import { Button } from "@mui/material";
import { KeyboardBackspace } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import { RegExp } from "../../Helpers/RegExp";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import OtpInput from "react-otp-input";
import { useTranslation } from "react-i18next";
import { HeaderContext } from "../../Context/Context";
import { BASE_URL } from "../../Config/Config";
import axios from "axios";
import { Loader } from "../../Assets/Loader/Loader";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Menu } from "@mui/material";

export const RecoverPassword = () => {
  const { t, i18n } = useTranslation("forgotpass");

  useEffect(() => {
    document.title = t("docTitle");
  }, [t]);

  const navigate = useNavigate();
  const { isArabic, setIsArabic } = useContext(HeaderContext);
  const regex = RegExp.REACT_APP_EMAILREGEX;
  const upperCase = RegExp.REACT_APP_UPPERCASEREGEX;
  const lowerCase = RegExp.REACT_APP_LOWERCASEREGEX;
  const digit = RegExp.REACT_APP_DIGITSREGEX;
  const specialChar = RegExp.REACT_APP_SPECIALCHARREGEX;

  const [visibility, setVisibility] = useState(false);
  const [OTP, setOTP] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [stage, setStage] = useState(0);
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

  const validateEmail = (formValues) => {
    const errors = {};
    if (!formValues.email) {
      errors.email = t("emailError");
    } else if (!regex.test(formValues.email)) {
      errors.email = t("invalidEmailError");
    }
    return errors;
  };

  const onEmailSubmit = async (e) => {
    e.preventDefault();
    const errors = validateEmail(values);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      await axios
        .post(BASE_URL + "auth/send-otp", { email: values.email })
        .then((res) => {
          setSnackbar(true);
          setErrorMsg(false);
          setMessage(res.data.message);
          setTimeout(() => {
            setLoading(false);
            setStage(1);
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

  const validateOtp = (formValues) => {
    const errors = {};
    if (!formValues) {
      errors.otp = t("otpError");
    }
    return errors;
  };

  const onOtpSubmit = async (e) => {
    e.preventDefault();
    const errors = validateOtp(OTP);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      await axios
        .post(BASE_URL + "auth/verify-otp", { email: values.email, otp: OTP })
        .then((res) => {
          setSnackbar(true);
          setErrorMsg(false);
          setMessage(res.data.message);
          setTimeout(() => {
            setLoading(false);
            setStage(2);
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

  const validate = (formValues) => {
    const errors = {};
    if (formValues.password.trim().length === 0) {
      errors.password = t("passwordError");
    } else if (!upperCase.test(formValues.password)) {
      errors.password = t("upperCaseError");
    } else if (!lowerCase.test(formValues.password)) {
      errors.password = t("lowerCaseError");
    } else if (!digit.test(formValues.password)) {
      errors.password = t("digitError");
    } else if (!specialChar.test(formValues.password)) {
      errors.password = t("specialCharError");
    } else if (formValues.password.length < 8) {
      errors.password = t("passwordLengthError");
    }

    if (formValues.confirmPassword.trim().length === 0) {
      errors.confirmPassword = t("confirmPasswordError");
    } else if (formValues.confirmPassword !== formValues.password) {
      errors.confirmPassword = t("confirmPasswordMatchError");
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
        .put(BASE_URL + "auth/reset-password", {
          email: values.email,
          otp: OTP,
          newPassword: values.password,
        })
        .then((res) => {
          setSnackbar(true);
          setErrorMsg(false);
          setMessage(res.data.message);
          setTimeout(() => {
            setLoading(false);
            navigate("/login");
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
    <div className="recoverPass w-100 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center w-100 p-3 recoverPassHeader">
        <Button
          className="recoverPassBackButton"
          variant="contained"
          onClick={() => navigate("/login")}
        >
          <KeyboardBackspace />
        </Button>
        <h4 className="m-3" onClick={() => navigate("/")}>
          {t("wkeel")}
        </h4>
      </div>
      <div className="w-100   recoverPassCompo d-flex justify-content-center">
        <div className="recoverPassForm w-50 d-flex flex-column justify-content-center align-items-center p-5 ">
          {stage === 2 ? (
            <>
              <h2>{t("resetPasswordTitle")}</h2>
              <span className="w-50">{t("resetPasswordMessage")}</span>
            </>
          ) : stage === 1 ? (
            <>
              <h2>{t("verifyOtpTitle")}</h2>
              <span className="w-50">{t("verifyOtpMessage")}</span>
            </>
          ) : stage === 0 ? (
            <>
              <h2>{t("recoverPasswordTitle")}</h2>
              <span className="w-50">{t("recoverPasswordMessage")}</span>
            </>
          ) : (
            ""
          )}
          {stage === 2 ? (
            <form className="w-75" onSubmit={onSubmit}>
              <div className="recoverPassFormCompo mt-4 d-flex flex-column justify-content-center align-items-center">
                <div className="mt-3 w-75">
                  <div className="mb-3">
                    <div
                      className={`input-group ${
                        isArabic ? "text-end" : "text-start"
                      }`}
                    >
                      <input
                        type={!visibility ? "password" : "text"}
                        className="form-control authInput passwordInput"
                        placeholder={t("newPasswordPlaceholder")}
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
                      <span
                        className="text-danger"
                        style={{ fontSize: "12px" }}
                      >
                        {formErrors.password}
                      </span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control authInput"
                      placeholder={t("confirmNewPasswordPlaceholder")}
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={onChange}
                    />
                    <div
                      className={
                        "w-100 " + (isArabic ? " text-end" : " text-start")
                      }
                    >
                      <span
                        className="text-danger"
                        style={{ fontSize: "12px" }}
                      >
                        {formErrors.confirmPassword}
                      </span>
                    </div>
                  </div>
                  <Button
                    className="w-100 recoverPassbtn"
                    variant="contained"
                    type="submit"
                  >
                    {loading ? <Loader /> : t("sendButton")}
                  </Button>
                </div>
              </div>
            </form>
          ) : stage === 1 ? (
            <form className="w-75" onSubmit={onOtpSubmit}>
              <div className="recoverPassFormCompo mt-4 d-flex flex-column justify-content-center align-items-center">
                <div className="mt-3 w-75">
                  <div className="mb-3">
                    <OtpInput
                      value={OTP}
                      onChange={setOTP}
                      numInputs={6}
                      renderInput={(props) => <input {...props} />}
                      containerStyle="otpContainer"
                      inputStyle="otpInput rounded"
                    />
                    <div
                      className={
                        "w-100 " + (isArabic ? " text-end" : " text-start")
                      }
                    >
                      <span
                        className="text-danger"
                        style={{ fontSize: "12px" }}
                      >
                        {formErrors.otp}
                      </span>
                    </div>
                  </div>
                  <Button
                    className="w-100 recoverPassbtn "
                    variant="contained"
                    type="submit"
                  >
                    {loading ? <Loader /> : t("verifyButton")}
                  </Button>
                </div>
              </div>
            </form>
          ) : stage === 0 ? (
            <>
              <form className="w-75" onSubmit={onEmailSubmit}>
                <div className="recoverPassFormCompo mt-4 d-flex flex-column justify-content-center align-items-center">
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
                        <span
                          className="text-danger"
                          style={{ fontSize: "12px" }}
                        >
                          {formErrors.email}
                        </span>
                      </div>
                    </div>
                    <Button
                      className="w-100 recoverPassbtn "
                      variant="contained"
                      type="submit"
                    >
                      {loading ? <Loader /> : t("sendButton")}
                    </Button>
                  </div>
                </div>
              </form>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="w-100 d-flex justify-content-start position-fixed bottom-0 mb-3 p-3">
        <Button
          id="basic-button"
          aria-controls={open3 ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open3 ? "true" : undefined}
          onClick={handleClick3}
          className="forgotPassLang p-2"
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
