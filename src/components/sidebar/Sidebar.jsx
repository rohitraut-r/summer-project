import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import logo1 from "../assets/logo.png"
import ArticleIcon from '@mui/icons-material/Article';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';



const Sidebar = () => {

  const navigate = useNavigate();

  const handleSignOut = () => {
    console.log('signout');
    localStorage.setItem("user", null);
    navigate("/login");
    window.location.reload();
   
  }

  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo"><img src={logo1} alt="..."/></span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to ="/dashboard" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">DATA</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Childrens</span>
            </li>
          </Link>
          <Link to="/members" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Members</span>
            </li>
          </Link>
          <Link to="/donors" style={{textDecoration: "none"}}>
          <li>
            <VolunteerActivismIcon className="icon" />
            <span>Donors</span>
          </li>
          </Link>
          <Link to="/documents" style={{textDecoration: "none"}}>
          <li>
            <ArticleIcon className="icon" />
            <span>Documents</span>
          </li>
          </Link>
          
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          {/* <Link to="/login" style={{ textDecoration: "none" }}> */}
          <div onClick={handleSignOut}>
          <li>
            <ExitToAppIcon className="icon" style={{color:'red'}}/>
            <span style={{color:'red'}}>Logout</span>
          </li>
          </div>
          {/* </Link> */}
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
