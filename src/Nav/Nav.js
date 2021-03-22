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
  .fa-bars {
    display: none;
    color: black;
    font-size: 2rem;
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

  @media only screen and (max-width: 720px) {
    height: auto;
    display: block;
    position: initial;
    
    .fa-bars {
      margin-top: 10px;
      display: inline-block;
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
    ul.collapsed {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-wrap: wrap;
      overflow: hidden;
      max-height: 0;
      position: initial;
      

      &.is-expanded {
        overflow: hidden;
        max-height: 200px; /* approximate max height */
      }
       li {
        padding: 15px 10px;
        margin: 0px 0px;
        width: 100%;
        font-size: 24px;
        color: #e93c0c;
      }
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
          <i
            className="fa fa-bars"
            aria-hidden="true"
            onClick={(e) => this.handleToggle(e)}
          />
          <ul className={`collapsed ${isExpanded ? "is-expanded" : ""}`}>
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
