import React, { useState } from "react";
import "./DocumentView.css";
import { Header } from "../../Components/Header/Header";
import { Button } from "@mui/material";
import kuwait from "../../Assets/Logos/kuwait.png";
import {
  RemoveRedEyeOutlined,
  ShareOutlined,
  BookmarkBorderOutlined,
  Search,
  SaveAlt,
} from "@mui/icons-material";
import Switch from "@mui/material/Switch";

export const DocumentView = () => {
  const [checked, setChecked] = useState({
    brightView: false,
    bionicReading: false,
  });

  const handleChange = (event) => {
    const { name, checked: isChecked } = event.target;
    setChecked((prevChecked) => ({
      ...prevChecked,
      [name]: isChecked,
    }));
  };

  return (
    <div className="document w-100">
      <Header />
      <div className="documentCompo container mb-5">
        <div className="documemtHeader w-100 d-flex justify-content-md-between flex-column flex-md-row align-items-md-center align-items-start">
          <div className="text-start d-flex flex-column gap-2">
            <h6>Property Management Agreement</h6>
            <span className="documentCreated">
              Created by: Wkeel Legal Team &nbsp;&nbsp;
              <span className="text-light">27/07/2023</span>
            </span>
            <div className="documentLanguage d-flex align-items-center gap-2">
              <Button className="documentBtn  p-2">Legal Document</Button>
              <img src={kuwait} alt="kuwait" height={30} />
              <Button className="documentBtn  p-2">EN</Button>
            </div>
          </div>
          <div className="d-flex flex-column gap-3">
            <div className="d-none d-md-flex gap-3 justify-content-end align-items-center documentSwitches">
              <div>
                <span>Bright View</span>
                <Switch
                  checked={checked.brightView}
                  name="brightView"
                  onChange={handleChange}
                />
              </div>
              <div>
                <span>Bionic Reading</span>
                <Switch
                  checked={checked.bionicReading}
                  name="bionicReading"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className=" d-flex align-items-center justify-content-end gap-2 mt-3 mt-md-0">
              <div className="input-group me-4">
                <span className="input-group-text homeInputGroup ">
                  <Search />
                </span>
                <input
                  type="text"
                  className="form-control homeInput documentSearch"
                  placeholder="Search.."
                />
              </div>
              <div className="d-flex gap-2 align-items-center">
                <span className="text-light">6</span>
                <RemoveRedEyeOutlined className="documentViewIcon" />
              </div>
              <Button className="documentBtn  p-2">
                <ShareOutlined className="documentViewIcon" />
              </Button>
              <Button className="documentBtn  p-2">
                <BookmarkBorderOutlined className="documentViewIcon" />
              </Button>
              <Button className="documentBtn  p-2">
                <SaveAlt className="documentViewIcon" />
              </Button>
            </div>
          </div>
        </div>
        <hr className="documentHr w-100 mt-3 mb-3" />
        <div
          className={
            (checked.brightView ? "brightContent " : "darkContent ") +
            " w-100 rounded p-2 documentContent" +
            (checked.bionicReading ? " bionicReading" : " ")
          }
        ></div>
      </div>
    </div>
  );
};
