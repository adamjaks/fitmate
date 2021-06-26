import React from 'react';
import './TrackerButton.scss';
import { FaPlay } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import axios from "axios";
import {connect} from "react-redux";

const GET_TRAININGS_ROUTE = "https://fitmate-server.herokuapp.com/api/trainings";

class TrackerButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trainings: [],
            selectedTraining: ""
        }

        this._onClickBind = this._onClick.bind(this);
        this._onTrainingSelectChangeBind = this._onTrainingSelectChange.bind(this);
    }

    componentDidMount() {
        this._fetchTrainings();

    }

    _fetchTrainings() {
        axios.get(`${GET_TRAININGS_ROUTE}/${this.props.auth.user.id}`).then(res => {
            this.setState(({trainings: res.data}))
            this.setState({selectedTraining: res.data[0]?._id});
        }).catch(err => {
            console.log(err);
        });
    }

    _onClick() {
        this.props.onClick(this.state.selectedTraining);
    }

    _onTrainingSelectChange(event) {
        this.setState({selectedTraining: event.target.value});
    }

    render() {
        return (
            <div className={"TrackerButton"} onClick={this._onClickBind}>
                <div className={"TrackerButton__info"}>
                    <div className={"TrackerButton__label"}>Rozpocznij trening</div>
                    { this.state.trainings.length > 0 &&
                        <select className={"TrackerButton__training-select"}
                                onClick={(evt) => evt.stopPropagation()}
                                onChange={this._onTrainingSelectChangeBind}>
                            {
                                this.state.trainings.map(training => {
                                    return <option value={training._id} key={training._id}>{training.name}</option>
                                })
                            }
                        </select>
                    }
                    {
                        this.state.trainings.length === 0 &&
                        <div className={"TrackerButton__warning"}>
                            <div className={"TrackerButton__warning-icon"}>
                                <IoWarningOutline/>
                            </div>
                            <div>
                                Nie masz jeszcze dodanych treningów.
                            </div>
                        </div>
                    }
                </div>
                {this.state.trainings.length > 0 &&
                    <div className={"TrackerButton__icon"}>
                        <FaPlay/>
                    </div>
                }
            </div>
        )
    }
}

TrackerButton.propTypes = {};

TrackerButton.defaultProps = {};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps)(TrackerButton)
