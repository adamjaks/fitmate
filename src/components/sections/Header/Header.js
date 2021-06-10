import React from 'react';
import './Header.scss';
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";

const Header = () => (
  <div className="Header">
      <Link to={"/"}>
          <div className={"Header__logo"}>
              FitMate
          </div>
      </Link>
      <Navigation/>
  </div>
);

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
