import React from 'react';
import './TrackerButton.scss';
import { FaPlay } from "react-icons/fa";
import axios from "axios";

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
        axios.get(GET_TRAININGS_ROUTE).then(res => {
            this.setState(({trainings: res.data}))
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
                    <select className={"TrackerButton__training-select"}
                            onClick={(evt) => evt.stopPropagation()}
                            onChange={this._onTrainingSelectChangeBind}>
                        {
                            this.state.trainings.map(training => {
                                return <option value={training._id} key={training._id}>{training.name}</option>
                            })
                        }
                    </select>
                </div>
                <div className={"TrackerButton__icon"}>
                    <FaPlay/>
                </div>
            </div>
        )
    }
}

TrackerButton.propTypes = {};

TrackerButton.defaultProps = {};

export default TrackerButton;
