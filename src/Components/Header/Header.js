import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import {
  Avatar,
  Button,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Box,
} from "@mui/material";
import {
  PersonOutlineOutlined,
  Close,
  Language,
  DarkMode,
  LightMode,
  Logout,
} from "@mui/icons-material";
import { IoMdMenu } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HeaderContext } from "../../Context/Context";
import { useTranslation } from "react-i18next";
import { Navbar } from "./HeaderData";

export const Header = () => {
  const {
    handleNavToggle,
    navVisible,
    darkMode,
    handleThemeToggle,
    isArabic,
    setIsArabic,
  } = useContext(HeaderContext);
  const { t, i18n } = useTranslation("common");
  const navigate = useNavigate();
  const location = useLocation();
  const lng = localStorage.getItem("lng") || "en";
  const user = JSON.parse(localStorage.getItem("user"));
  const [initials, setInitials] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);

  useEffect(() => {
    if (user) {
      const title = user.username.split(" ");
      setInitials((title[0]?.charAt(0) || "") + (title[1]?.charAt(0) || ""));
    }
  }, [user]);

  const handleClose = () => setAnchorEl(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose2 = () => setAnchorEl2(null);
  const handleClick2 = (event) => setAnchorEl2(event.currentTarget);
  const handleClose3 = () => setAnchorEl3(null);
  const handleClick3 = (event) => setAnchorEl3(event.currentTarget);

  const logout = () => {
    handleNavToggle();
    handleClose();
    navigate("/");
    localStorage.clear();
    sessionStorage.clear();
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsArabic(!isArabic);
    localStorage.setItem("lng", lng);
    handleClose3();
  };

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n.language, i18n]);

  return (
    <div className="mainHeader pb-2 pt-2 d-flex align-items-center">
      <div className="container d-flex justify-content-between flex-row align-items-center">
        {user && (
          <div className="d-flex d-lg-none align-items-center">
            <Box>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={anchorEl ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={Boolean(anchorEl)}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      fontSize: "14px",
                      fontFamily: "inherit",
                    }}
                    variant="square"
                    className="rounded headerAvatar"
                  >
                    {initials || <PersonOutlineOutlined />}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            >
              <MenuItem>
                <div className="d-flex flex-column mx-2 userProfile">
                  <span>{user.username}</span>
                  <p>{user.email}</p>
                </div>
              </MenuItem>
              <Divider />
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <Logout fontSize="small" className="headerIcon" />
                </ListItemIcon>
                {t("header.logout")}
              </MenuItem>
            </Menu>
          </div>
        )}
        <div
          className={
            "headerLogo col-lg-3 d-flex justify-content-lg-start col-md-6 " +
            (user ? " justify-content-md-center" : " justify-content-md-start")
          }
        >
          <Link to="/" className="link">
            <h4>{t("header.wkeel")}</h4>
          </Link>
        </div>
        <div className="headerNav d-none d-lg-flex justify-content-around align-items-center col-6">
          <Button
            id="basic-button"
            aria-controls={anchorEl2 ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl2)}
            onClick={handleClick2}
            className="navFeatures"
          >
            {t("header.features")}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl2}
            open={Boolean(anchorEl2)}
            onClose={handleClose2}
            MenuListProps={{ "aria-labelledby": "basic-button" }}
          >
            <MenuItem onClick={handleClose2}>{t("header.search")}</MenuItem>
            <MenuItem onClick={handleClose2}>{t("header.drafting")}</MenuItem>
          </Menu>
          {Navbar?.map((i, index) => (
              <Link key={index} to={i.link} className="link">
                <div
                  className="navLinks"
                  id={location.pathname === i.link ? "activePath" : ""}
                >
                {t(`header.${i.title}`)}
                </div>
              </Link>
          ))}
        </div>
        <div className="headerLogin col-3 d-flex justify-content-end gap-2">
          <Tooltip
            title={darkMode ? t("header.lightMode") : t("header.darkMode")}
          >
            <IconButton onClick={handleThemeToggle}>
              {darkMode ? (
                <LightMode className="headerIcon" fontSize="small" />
              ) : (
                <DarkMode className="headerIcon" fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
          <Button
            id="basic-button"
            aria-controls={anchorEl3 ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl3)}
            onClick={handleClick3}
            className="langbtn"
          >
            <Language />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl3}
            open={Boolean(anchorEl3)}
            onClose={handleClose3}
            MenuListProps={{ "aria-labelledby": "basic-button" }}
          >
            {lng === "en" && !isArabic ? (
              <MenuItem onClick={() => changeLanguage("ar")}>
                {t("header.arabic")}
              </MenuItem>
            ) : (
              <MenuItem onClick={() => changeLanguage("en")}>
                {t("header.english")}
              </MenuItem>
            )}
          </Menu>
          {user ? (
            <div className="d-none d-lg-flex align-items-center">
              <Box>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={anchorEl ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={Boolean(anchorEl)}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        fontSize: "14px",
                        fontFamily: "inherit",
                      }}
                      variant="square"
                      className="rounded headerAvatar"
                    >
                      {initials || <PersonOutlineOutlined />}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
              >
                <MenuItem>
                  <div className="d-flex flex-column mx-2 userProfile">
                    <span>{user.username}</span>
                    <p>{user.email}</p>
                  </div>
                </MenuItem>
                <Divider />
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <Logout fontSize="small" className="headerIcon" />
                  </ListItemIcon>
                  {t("header.logout")}
                </MenuItem>
              </Menu>
            </div>
          ) : (
          <div
            className="d-none d-lg-flex align-items-center"
            onClick={() => navigate("/login")}
          >
            <Avatar
              variant="square"
                className="me-2 headerAvatar"
              onClick={handleNavToggle}
            >
              <PersonOutlineOutlined />
            </Avatar>
              &nbsp; {t("header.login")}
          </div>
          )}
          <div className="d-flex d-lg-none align-items-center">
            <Avatar
              variant="square"
              className="me-2 headerAvatar"
              onClick={handleNavToggle}
            >
              {navVisible ? <Close /> : <IoMdMenu />}
            </Avatar>
          </div>
        </div>
      </div>
      {navVisible && (
        <div className="header-sm w-100 d-flex d-lg-none flex-column justify-content-start align-items-center p-3 pt-5">
          <Button
            id="basic-button"
            aria-controls={anchorEl2 ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl2)}
            onClick={handleClick2}
            className="navFeatures navFeatures-sm"
          >
            {t("header.features")}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl2}
            open={Boolean(anchorEl2)}
            onClose={handleClose2}
            MenuListProps={{ "aria-labelledby": "basic-button" }}
          >
            <MenuItem onClick={handleClose2}>{t("header.search")}</MenuItem>
            <MenuItem onClick={handleClose2}>{t("header.drafting")}</MenuItem>
          </Menu>
          {Navbar?.map((i, index) => (
              <Link
                key={index}
                to={i.link}
                className="link"
                onClick={handleNavToggle}
              >
                <div
                  className="navLinks-sm"
                  id={location.pathname === i.link ? "activePath" : ""}
                >
                {t(`header.${i.title}`)}
                </div>
              </Link>
          ))}
          <hr className="header-hr w-100" />
          {user ? (
          <Button
            fullWidth
              className="w-100 headerBtn"
              variant="contained"
              onClick={logout}
            >
              {t("header.logout")}
            </Button>
          ) : (
            <Button
              fullWidth
              className="w-100 headerBtn"
            variant="contained"
            onClick={() => {
              navigate("/login");
              handleNavToggle();
            }}
          >
              {t("header.login")}
          </Button>
          )}
        </div>
      )}
    </div>
  );
};
