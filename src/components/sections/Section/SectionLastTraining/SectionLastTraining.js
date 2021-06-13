import React from 'react';
import './SectionLastTraining.scss';
import { FaBurn } from "react-icons/fa";
import { FaStopwatch } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaRunning } from 'react-icons/fa';
import axios from "axios";

const GET_LAST_TRAINING_PATH = "https://fitmate-server.herokuapp.com/api/training-days/last";

class SectionLastTraining extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lastTraining: {}
        };
    }

    componentDidMount() {
        // todo: rewrite date formatting

        axios.get(`${GET_LAST_TRAINING_PATH}`).then(res => {
            this.setState({lastTraining: res.data});
        }).catch(err => {
            console.log(err);
        });
    }

    _formatTime(timer, short) {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

        if (short) {
            return `${getMinutes}:${getSeconds}`
        } else {
            return `${getHours}:${getMinutes}:${getSeconds}`
        }
    }

    render() {
        return (
            <div className="SectionLastTraining">
                {/*<div className={"SectionLastTraining__param SectionLastTraining__param--localization"}>*/}
                {/*    <div className={"SectionLastTraining__param-icon"}>*/}
                {/*        <FaMapMarkerAlt/>*/}
                {/*    </div>*/}
                {/*    <div className={"SectionLastTraining__param-label"}>*/}
                {/*        FitFabric 1.0, Kilińskiego*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className={"SectionLastTraining__param"}>
                    <div className={"SectionLastTraining__param-icon"}>
                        <FaBurn/>
                    </div>
                    <div className={"SectionLastTraining__param-label"}>
                        { this.state.lastTraining.caloriesBurned } kcal
                    </div>
                </div>
                <div className={"SectionLastTraining__param"}>
                    <div className={"SectionLastTraining__param-icon"}>
                        <FaStopwatch/>
                    </div>
                    <div className={"SectionLastTraining__param-label"}>
                        { this._formatTime(this.state.lastTraining.duration) }
                    </div>
                </div>
                <div className={"SectionLastTraining__param"}>
                    <div className={"SectionLastTraining__param-icon"}>
                        <FaRegClock/>
                    </div>
                    <div className={"SectionLastTraining__param-label"}>
                        { new Date(this.state.lastTraining.date).getDate() }
                        .
                        { new Date(this.state.lastTraining.date).getMonth() + 1 }
                    </div>
                </div>
                <div className={"SectionLastTraining__param"}>
                    <div className={"SectionLastTraining__param-icon"}>
                        <FaRunning/>
                    </div>
                    <div className={"SectionLastTraining__param-label"}>
                        { this.state.lastTraining.trainingName }
                    </div>
                </div>
            </div>
        )
    }
}

SectionLastTraining.propTypes = {};

SectionLastTraining.defaultProps = {};

export default SectionLastTraining;
