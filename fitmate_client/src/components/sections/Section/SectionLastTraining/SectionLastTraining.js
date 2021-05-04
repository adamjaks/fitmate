import React from 'react';
import './SectionLastTraining.scss';
import { FaBurn } from "react-icons/fa";
import { FaStopwatch } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";

const SectionLastTraining = () => (
    <div className="SectionLastTraining">
        <div className={"SectionLastTraining__param SectionLastTraining__param--localization"}>
            <div className={"SectionLastTraining__param-icon"}>
                <FaMapMarkerAlt/>
            </div>
            <div className={"SectionLastTraining__param-label"}>
                FitFabric 1.0, Kilińskiego
            </div>
        </div>
        <div className={"SectionLastTraining__param"}>
            <div className={"SectionLastTraining__param-icon"}>
                <FaBurn/>
            </div>
            <div className={"SectionLastTraining__param-label"}>
                577 kcal
            </div>
        </div>
        <div className={"SectionLastTraining__param"}>
            <div className={"SectionLastTraining__param-icon"}>
                <FaStopwatch/>
            </div>
            <div className={"SectionLastTraining__param-label"}>
                01:12:34
            </div>
        </div>
    </div>
);

SectionLastTraining.propTypes = {};

SectionLastTraining.defaultProps = {};

export default SectionLastTraining;
