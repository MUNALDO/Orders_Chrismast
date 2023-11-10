import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Export = ({ inputs, title }) => {
  const location = useLocation();
  const orgPath = location.pathname.split("/")[1];
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  // console.log(orgPath);

  // const handleChange = (e) => {
  //   setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  // };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");

    try {

      await axios.post("/order/export-xlsx");

    } catch (err) {
      console.log(err);
    }
  };

  // console.log(info);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <button onClick={handleClick}>Export</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Export;
