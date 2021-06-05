import React from 'react';

import { FaAngleRight } from 'react-icons/fa';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaRegChartBar } from 'react-icons/fa';
import { FaRunning } from 'react-icons/fa';
import { BiDumbbell } from 'react-icons/bi';

import './SectionButton.scss';

class SectionButton extends React.Component {

    _icon = null;

    _getIcon() {
        switch(this.props.icon) {
            case "calendar": return <FaRegCalendarAlt />;
            case "progress": return <FaRegChartBar />;
            case "exercises": return <BiDumbbell />;
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

SectionButton.defaultProps = {};

export default SectionButton;
