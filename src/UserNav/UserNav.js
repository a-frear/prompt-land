import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";

const UserNav = () => {
  const { isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <nav className="userNav">
        <ul className="userNavUL">
          <NavLink className="navigation-link-user" to="/new-prompt">
            <li className="icon-nav">
              <FontAwesomeIcon icon={faPlusSquare} />
            </li>
          </NavLink>
          <NavLink className="navigation-link-user" to="/profile">
            <li className="icon-nav">
              <FontAwesomeIcon icon={faUser} />
            </li>
          </NavLink>
          <NavLink className="navigation-link-user" to="/following">
            <li className="icon-nav">
              <FontAwesomeIcon icon={faUsers} />
            </li>
          </NavLink>
        </ul>
      </nav>
    )
  );
};

export default UserNav;
