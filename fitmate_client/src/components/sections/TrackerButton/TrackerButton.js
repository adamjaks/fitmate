import React from 'react';
import './TrackerButton.scss';
import { FaPlay } from "react-icons/fa";

const TrackerButton = (props) => (
    <div className={"TrackerButton"}>
        <div className={"TrackerButton__info"}>
            <div className={"TrackerButton__label"}>Rozpocznij trening</div>
            <select className={"TrackerButton__training-select"}>
                <option>Trening A</option>
                <option>Trening B</option>
                <option>Trening FBW</option>
            </select>
        </div>
        <div className={"TrackerButton__icon"}>
            <FaPlay/>
        </div>
    </div>
);

TrackerButton.propTypes = {};

TrackerButton.defaultProps = {};

export default TrackerButton;
