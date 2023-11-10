import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MedicationIcon from "@mui/icons-material/Medication";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import logo from "../../images/logo.png";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="">
            <div>
              <img src={logo} alt="" />
            </div>
          </span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">AUTH</p>
          <Link to="/loginUser" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Login</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/users/get" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Patients</span>
            </li>
          </Link>
          <Link to="/doctors/get" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Doctors</span>
            </li>
          </Link>
          <Link to="/order/get" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          <Link to="/booking/get" style={{ textDecoration: "none" }}>
            <li>
              <BookOnlineIcon className="icon" />
              <span>Bookings</span>
            </li>
          </Link>
          <Link to="/stocks/get" style={{ textDecoration: "none" }}>
            <li>
              <MedicationIcon className="icon" />
              <span>Pils Stock</span>
            </li>
          </Link>
          <Link to="/equipments/get" style={{ textDecoration: "none" }}>
            <li>
              <MedicationLiquidIcon className="icon" />
              <span>Equipments</span>
            </li>
          </Link>
          <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
