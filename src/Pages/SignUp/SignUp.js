import React, { useEffect, useState, useContext } from "react";
import "./SignUp.css";
import { Button, FormControl, Select } from "@mui/material";
import {
  KeyboardBackspace,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import { RegExp } from "../../Helpers/RegExp";
import { useTranslation } from "react-i18next";
import { HeaderContext } from "../../Context/Context";
import ReactFlagsSelect from "react-flags-select";
import { BASE_URL } from "../../Config/Config";
import axios from "axios";
import { Loader } from "../../Assets/Loader/Loader";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Menu } from "@mui/material";

export const SignUp = () => {
  const { t, i18n } = useTranslation("signup");

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
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profession: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    profession: "",
  });
  const [selected, setSelected] = useState("");
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
    if (name === "name") {
      value = value.replace(/[0-9]/g, "");
    }
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

  const validate = (formValues, selected) => {
    const errors = {};
    if (formValues.name?.trim().length === 0) {
      errors.name = t("nameError");
    }
    if (!formValues.email) {
      errors.email = t("emailError");
    } else if (!regex.test(formValues.email)) {
      errors.email = t("invalidEmailError");
    }
    if (formValues.password?.trim().length === 0) {
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

    if (formValues.confirmPassword?.trim().length === 0) {
      errors.confirmPassword = t("confirmPasswordError");
    } else if (formValues.confirmPassword !== formValues.password) {
      errors.confirmPassword = t("confirmPasswordMatchError");
    }

    if (selected?.trim().length === 0) {
      errors.country = t("countryError");
    }

    if (formValues.profession?.trim().length === 0) {
      errors.profession = t("professionError");
    }

    return errors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(values, selected);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);

      await axios
        .post(BASE_URL + "auth/signup", {
          username: values.name,
          email: values.email,
          password: values.password,
          country: selected,
          profession: values.profession,
        })
        .then((res) => {
          setSnackbar(true);
          setErrorMsg(false);
          setMessage(res.data.message);
          setTimeout(() => {
            setLoading(false);
            navigate("/login");
            setValues({
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
              profession: "",
            });
            setSelected("");
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
    <div className="signUp w-100 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center w-100 p-3 signUpHeader">
        <Button
          className="signUpBackButton"
          variant="contained"
          onClick={() => navigate("/login")}
        >
          <KeyboardBackspace />
        </Button>
        <h4 className="m-3" onClick={() => navigate("/")}>
          {t("wkeel")}
        </h4>
      </div>
      <div className="w-100 d-flex signUpCompo justify-content-center ">
        <div className=" w-50 d-flex flex-column justify-content-center align-items-center p-5  signUpForm">
          <h2>{t("title")}</h2>
          <span>{t("subtitle")}</span>
          <form className="w-75" onSubmit={onSubmit}>
            <div className="signUpFormCompo mt-4 d-flex flex-column justify-content-center align-items-center">
              <div className="mt-3 w-75">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control authInput"
                    placeholder={t("fullNamePlaceholder")}
                    name="name"
                    value={values.name}
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
                <div className="mb-3">
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
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control authInput"
                    placeholder={t("confirmPasswordPlaceholder")}
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={onChange}
                  />
                  <div
                    className={
                      "w-100 " + (isArabic ? " text-end" : " text-start")
                    }
                  >
                    <span className="text-danger" style={{ fontSize: "12px" }}>
                      {formErrors.confirmPassword}
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  <ReactFlagsSelect
                    selected={selected}
                    onSelect={(code) => setSelected(code)}
                    searchable
                    placeholder={t("countryPlaceholder")}
                    className="countrySelect rounded"
                  />

                  <div
                    className={
                      "w-100 " + (isArabic ? " text-end" : " text-start")
                    }
                  >
                    <span className="text-danger" style={{ fontSize: "12px" }}>
                      {formErrors.country}
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  <FormControl sx={{ minWidth: 120 }} fullWidth>
                    <Select
                      onChange={onChange}
                      value={values.profession}
                      name="profession"
                      sx={{
                        height: "48px",
                        textAlign: "start",
                        fontSize: "14px",
                      }}
                      placeholder="What is your profession?"
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        {t("professionPlaceholder")}
                      </MenuItem>

                      <MenuItem value="legalProfessional">
                        {t("professions.legalProfessional")}
                      </MenuItem>

                      <MenuItem value="student">
                        {t("professions.student")}
                      </MenuItem>
                      <MenuItem value="other">
                        {t("professions.other")}
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <div
                    className={
                      "w-100 " + (isArabic ? " text-end" : " text-start")
                    }
                  >
                    <span className="text-danger" style={{ fontSize: "12px" }}>
                      {formErrors.profession}
                    </span>
                  </div>
                </div>

                <Button className="w-100 " variant="contained" type="submit">
                  {loading ? <Loader /> : t("signUpButton")}
                </Button>
              </div>
              <span className="mt-4 w-75" style={{ zIndex: 100 }}>
                {t("termsAgreement")} &nbsp;
                <Link
                  className="link text-decoration-underline"
                  to="/privacy-policy"
                >
                  {t("termsLink")}
                </Link>
              </span>
              <span className="mt-4 fw-bold" style={{ zIndex: 100 }}>
                {t("loginPrompt")}&nbsp;
                <span className="loginLink" onClick={() => navigate("/login")}>
                  {t("loginLink")}
                </span>
              </span>
            </div>
          </form>
        </div>
      </div>
      <div className="d-flex justify-content-start position-fixed bottom-0 mb-3 w-100 p-3">
        <Button
          id="basic-button"
          aria-controls={open3 ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open3 ? "true" : undefined}
          onClick={handleClick3}
          className="singupLang p-2"
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
