import React from 'react';
import PropTypes from 'prop-types';

import './CalendarPage.scss';

import Section from "../../sections/Section/Section";
import Header from "../../sections/Header/Header";

const CalendarPage = () => (
  <div className="CalendarPage">
      <Header/>
      <Section title={"Kalendarz"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Section>
  </div>
);

CalendarPage.propTypes = {};

CalendarPage.defaultProps = {};

export default CalendarPage;
