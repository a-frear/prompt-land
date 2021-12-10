import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faUser,
//   faUsers,
//   faPlusSquare,
// } from "@fortawesome/free-solid-svg-icons";

const UserNav = () => {
  const { isAuthenticated } = useAuth0();
  const [isActive, setIsActive] = useState();
  const [currentPage] = useState(window.location.pathname);

  console.log({isActive})

  useEffect(() => {
    setIsActive(window.location.pathname);
  }, [currentPage]);

  return (
    isAuthenticated && (
      <nav className="userNav">
        <ul className="userNavUL">
          <NavLink className="navigation-link-user" to="/new-prompt">
            <li
              className={`icon-nav ${
                isActive === "/new-prompt"
                  ? "icon-nav-active"
                  : ""
              }`}
            >
              Share
            </li>
          </NavLink>
          <NavLink className="navigation-link-user" to="/profile">
            <li
              className={`icon-nav ${
                isActive === "/profile"
                  ? "icon-nav-active"
                  : ""
              }`}
            >
              Profile
            </li>
          </NavLink>
          <NavLink className="navigation-link-user" to="/following">
            <li
              className={`icon-nav ${
                isActive === "/following"
                  ? "icon-nav-active"
                  : ""
              }`}
            >
              Following
            </li>
          </NavLink>
        </ul>
      </nav>
    )
  );
};

export default UserNav;
