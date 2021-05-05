import React from 'react';
import PropTypes from "prop-types";

import { FaAngleRight } from 'react-icons/fa';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaRegChartBar } from 'react-icons/fa';
import { FaRunning } from 'react-icons/fa';

import './SectionButton.scss';

class SectionButton extends React.Component {

    _icon = null;

    constructor(props) {
        super(props);
    }

    _getIcon() {
        switch(this.props.id) {
            case "calendar": return <FaRegCalendarAlt />;
            case "progress": return <FaRegChartBar />;
            case "trainings": return <FaRunning />;
            default: return null;
        }
    }

    render() {
        this._icon = this._getIcon();

        return (
            <div className="SectionButton"
                 onClick={() => this.props.onClick(this)}>
                <div className={"SectionButton__icon"}>
                    { this._icon }
                </div>
                <div className={"SectionButton__label-wrapper"}>
                    <div className={"SectionButton__title"}>{this.props.title}</div>
                    <div className={"SectionButton__brief"}>{this.props.brief}</div>
                </div>
                <div className={"SectionButton__action-button"}>
                    <FaAngleRight/>
                </div>
            </div>
        )
    }
}

// SectionButton.propTypes = {
//     onPress: PropTypes.func.isRequired
// };

SectionButton.defaultProps = {};

export default SectionButton;
