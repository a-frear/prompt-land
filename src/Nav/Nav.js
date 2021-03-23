import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import LoginButton from "../LoginButton/LoginButton";
import LogoutButton from "../LogoutButton/LogoutButton";

const Navigation = styled.header`
.navigation-link {
    color: black;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 42px;
    font-weight: bold;
  }

.navigation-link {
    color: #F73BB2;
  }

}

  .nav ul {
    display: flex;
    justify-content: space-around;
    margin-top: -15px;
}

.nav li {
    font-size: 30px;
    margin-left: 25px;
    color: #000000;
    text-decoration: none;
}

li:hover {
    color: #f73bb2;
}

@media only screen and (max-width: 700px) {
  .nav ul {
    margin-top: -40px;
    display: flex;
    flex-direction: column;
} 
.nav li {
  font-size: 24px;
  text-style: none;
  margin-left: 0px;
}
@media only screen and (max-width: 400px) {
  .nav ul {
    margin-top: 50px;
    margin-left: -250px;
    display: flex;
    flex-direction: row;
} 
`;

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }
  handleToggle(e) {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  }

  render() {
    const { isExpanded } = this.state;

    return (
      <Navigation>
        <nav className="nav">
          <ul>
            <NavLink
              activeClassName="active"
              className="navigation-link"
              to="/discover"
              onClick={(e) => this.handleToggle(e)}
            >
              <li>Discover</li>
            </NavLink>
            <LoginButton />
            <LogoutButton />
          </ul>
        </nav>
      </Navigation>
    );
  }
}

export default Nav;
