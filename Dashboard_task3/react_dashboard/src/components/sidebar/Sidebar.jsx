import React from "react";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsSystemDaydreamIcon from "@mui/icons-material/SettingsSystemDaydream";
import LoginIcon from "@mui/icons-material/Login";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);

  // Define routes that are allowed to be clicked
  const enabledRoutes = ["/", "/users", "/products", "/stats"];

  const NavItem = ({ to, icon: Icon, label }) => {
    const isEnabled = enabledRoutes.includes(to);
    return isEnabled ? (
      <Link to={to} style={{ textDecoration: "none" }}>
        <li>
          <Icon className="icon" />
          <span>{label}</span>
        </li>
      </Link>
    ) : (
      <li className="disabled-link">
        <Icon className="icon" />
        <span>{label}</span>
      </li>
    );
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">AD</span>
        </Link>
      </div>

      <hr />

      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <NavItem to="/" icon={DashboardIcon} label="Dashboard" />

          <p className="title">LISTS</p>
          <NavItem to="/users" icon={PersonOutlinedIcon} label="Users" />
          <NavItem to="/products" icon={Inventory2OutlinedIcon} label="Products" />
          <NavItem to="/orders" icon={ShoppingCartIcon} label="Orders" />

          <p className="title">USEFUL</p>
          <NavItem to="/delivery" icon={LocalShippingIcon} label="Delivery" />
          <NavItem to="/stats" icon={QueryStatsIcon} label="Stats" />
          <NavItem to="/notifications" icon={NotificationsIcon} label="Notifications" />

          <p className="title">SERVICE</p>
          <NavItem to="/system-health" icon={SettingsSystemDaydreamIcon} label="System Health" />
          <NavItem to="/logs" icon={LoginIcon} label="Logs" />
          <NavItem to="/settings" icon={SettingsIcon} label="Settings" />

          <p className="title">USER</p>
          <NavItem to="/profile" icon={AccountCircleIcon} label="Profile" />
          <NavItem to="/logout" icon={LogoutIcon} label="Logout" />
        </ul>
      </div>

      <div className="bottom-color">
        <div className="coloroptions" onClick={() => dispatch({ type: "LIGHT" })}></div>
        <div className="coloroptions" onClick={() => dispatch({ type: "DARK" })}></div>
      </div>
    </div>
  );
};

export default Sidebar;
