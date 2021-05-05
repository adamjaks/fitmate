import React from 'react';
import './Header.scss';
import { FaBars } from "react-icons/fa";

const Header = () => (
  <div className="Header">
      <div className={"Header__bar"}>
          <div className={"Header__logo"}>
              FitMate
          </div>
          <div className={"Header__menu"}>
            <FaBars/>
          </div>
      </div>
  </div>
);

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
