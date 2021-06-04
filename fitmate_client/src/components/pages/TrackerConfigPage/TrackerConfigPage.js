import React from 'react';
import './TrackerConfigPage.scss';

import Header from "../../sections/Header/Header";
import axios from "axios";
import InputControl from "../../controls/InputControl/InputControl";
import ButtonControl from "../../controls/ButtonControl/ButtonControl";
import SelectControl from "../../controls/SelectControl/SelectControl";

const GET_EXERCISE_DETAILS_ROUTE = "/api/exercises/details";
const GET_TRAINING_DETAILS_ROUTE = "/api/trainings/details";

const SERIES_TO_CHOOSE = [
    {
        value: "1",
        name: "1"
    },
    {
        value: "2",
        name: "2"
    },
    {
        value: "3",
        name: "3"
    },
    {
        value: "4",
        name: "4"
    },
    {
        value: "5",
        name: "5"
    },
];

class TrackerConfigPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            exercises: [],
            training: {},
            exercisesWithValues: {}
        }

        this._onStartButtonClickBind = this._onStartButtonClick.bind(this);
    }

    componentDidMount() {
        this._fetchTraining();
    }

    _fetchTraining() {
        axios.get(`${GET_TRAINING_DETAILS_ROUTE}/60b47542dc0da71b8653edcc`).then(res => {
            this.setState({training: res.data});
            this._fetchExercises();
        }).catch(err => {
            console.log(err);
        });
    }

    _fetchExercises() {
        this.state.training.exercisesIds.forEach(exerciseId => {
            this._fetchExerciseById(exerciseId);
        });
    }

    _fetchExerciseById(exerciseId) {
        axios.get(`${GET_EXERCISE_DETAILS_ROUTE}/${exerciseId}`).then(res => {
            this.setState({
                exercises: [...this.state.exercises, {
                    name: res.data.name,
                    id: res.data._id
                }]
            });
        }).catch(err => {
            console.log(err);
        });
    }

    _onStartButtonClick(evt) {
        this.props.history.push("/tracker-training", {exercises: this.state.exercisesWithValues});
    }

    _onSeriesSelectChange(evt, name) {
        const newExercisesWithValues = this.state.exercisesWithValues;

        newExercisesWithValues[name] = {
            ...newExercisesWithValues[name], series: evt.target.value
        }

        this.setState({exercisesWithValues: newExercisesWithValues});
    }

    _onRepeatsInputChange(evt, name) {
        const newExercisesWithValues = this.state.exercisesWithValues;

        newExercisesWithValues[name] = {
            ...newExercisesWithValues[name], repeats: evt.target.value
        }

        this.setState({exercisesWithValues: newExercisesWithValues});
    }

    render() {
        return (
            <div className="TrackerConfigPage">
                <Header/>
                <h2 className={"title"}>{this.state.training.name}</h2>
                {
                    this.state.exercises.map(exercise => {
                        return (
                            <div className={"TrackerConfigPage__exercise"} key={exercise.id}>
                                <div className={"TrackerConfigPage__exercise-label"}>{exercise.name}</div>
                                <SelectControl className={"TrackerConfigPage__exercise-series-select"}
                                               options={SERIES_TO_CHOOSE}
                                               onChange={(evt) => this._onSeriesSelectChange(evt, exercise.name)}/>
                                <div className={"TrackerConfigPage__exercise-weight-input"}>
                                    <InputControl placeholder={10}
                                                  onChange={(evt) => this._onRepeatsInputChange(evt, exercise.name)}/>
                                </div>
                            </div>
                        )
                    })
                }

                <div className={"TrackerConfigPage__config-item"}>
                    <div className={"TrackerConfigPage__config-item-label"}>Rozgrzewka</div>
                    <div className={"TrackerConfigPage__config-item-select"}>
                        <InputControl placeholder={10}/>
                    </div>
                </div>

                <div className={"TrackerConfigPage__config-item"}>
                    <div className={"TrackerConfigPage__config-item-label"}>Przerwa</div>
                    <div className={"TrackerConfigPage__config-item-select"}>
                        <InputControl value={90}/>
                    </div>
                </div>
                <ButtonControl value={"Rozpocznij trening"} onClick={this._onStartButtonClickBind}/>

            </div>
        )
    }
}


TrackerConfigPage.propTypes = {};

TrackerConfigPage.defaultProps = {};

export default TrackerConfigPage;
