import React from 'react';
import './SectionLastTraining.scss';
import { FaBurn } from "react-icons/fa";
import { FaStopwatch } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaRunning } from 'react-icons/fa';
import axios from "axios";
import {connect} from "react-redux";

const GET_LAST_TRAINING_PATH = "https://fitmate-server.herokuapp.com/api/training-days/last";

class SectionLastTraining extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lastTraining: {}
        };
    }

    componentDidMount() {
        axios.get(`${GET_LAST_TRAINING_PATH}/${this.props.auth.user.id}`).then(res => {
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
                { this.state.lastTraining &&
                    <React.Fragment>
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
                                /
                                { new Date(this.state.lastTraining.date).getMonth() + 1 }
                                /
                                { new Date(this.state.lastTraining.date).getFullYear() }
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
                    </React.Fragment>
                }
                {
                    !this.state.lastTraining &&
                    (
                        <div>Nie ukończyłeś jeszcze żadnego treningu.</div>
                    )
                }

            </div>
        )
    }
}

SectionLastTraining.propTypes = {};

SectionLastTraining.defaultProps = {};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps)(SectionLastTraining);
