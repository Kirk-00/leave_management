// @flow
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { SetLogout } from "../../redux/slices/AuthSlice";

const ProfileDropdown = (props) => {
  const profilePic = props.profilePic || null;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch();

  /*
   * toggle profile-dropdown
   */
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        variant="link"
        id="dropdown-profile"
        as={Link}
        to="#"
        onClick={toggleDropdown}
        className="nav-link dropdown-toggle nav-user arrow-none me-0 bg-danger text-white"
      >
        
        <span className="account-user-avatar" >
          <img src={profilePic} className="rounded-circle" alt="user" />
        </span>
        <span>
          <span className="account-user-name">{props.username}</span>
          <span className="account-position">{props.userTitle}</span>
        </span>
       
      </Dropdown.Toggle>
      <Dropdown.Menu
        align={"end"}
        className="dropdown-menu-animated topbar-dropdown-menu profile-dropdown bg-dark"
      >
        <div onClick={toggleDropdown} style={{
        backgroundColor: '#001219'
      }}>
         
          {props.menuItems.map((item, i) => {
            return item.label === "Logout" ? (
              <Link
                onClick={() => dispatch(SetLogout())}
                to={item.redirectTo}
                className="dropdown-item notify-item"
                key={i + "-profile-menu"}
              >
                <i className={classNames(item.icon, "me-1")}></i>
                <span>{item.label}</span>
              </Link>
            ) : (
              <Link
                to={item.redirectTo}
                className="dropdown-item notify-item"
                key={i + "-profile-menu"}
              >
                <i className={classNames(item.icon, "me-1")}></i>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
