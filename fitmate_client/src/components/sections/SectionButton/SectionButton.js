import React from 'react';
import './SectionButton.scss';
import { FaAngleRight } from 'react-icons/fa';

const SectionButton = (props) => (
  <div className="SectionButton">
      <div className={"SectionButton__title"}>{props.title}</div>
      <div className={"SectionButton__action-button"}><FaAngleRight/></div>
  </div>
);

SectionButton.propTypes = {};

SectionButton.defaultProps = {};

export default SectionButton;
