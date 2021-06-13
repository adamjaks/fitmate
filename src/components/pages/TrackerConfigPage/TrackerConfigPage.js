import React from 'react';
import './TrackerConfigPage.scss';

import Header from "../../sections/Header/Header";
import axios from "axios";
import InputControl from "../../controls/InputControl/InputControl";
import ButtonControl from "../../controls/ButtonControl/ButtonControl";
import SelectControl from "../../controls/SelectControl/SelectControl";

const GET_EXERCISE_DETAILS_ROUTE = "https://fitmate-server.herokuapp.com/api/exercises/details";
const GET_TRAINING_DETAILS_ROUTE = "https://fitmate-server.herokuapp.com/api/trainings/details";

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

const DEFAULT_SERIES_COUNT = 3;
const DEFAULT_REPEATS_COUNT = 12;


class TrackerConfigPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            exercises: [],
            training: {},
            exercisesWithValues: [],
            pauseDuration: 90,
            warmupDuration: 5 * 60
        }


        this._onStartButtonClickBind = this._onStartButtonClick.bind(this);
        this._onPauseInputChangeBind = this._onPauseInputChange.bind(this);
        this._onWarmupInputChangeBind = this._onWarmupInputChange.bind(this);
    }

    componentDidMount() {
        this._fetchTraining();
    }

    _fillEmptyExercises() {
        let exercisesWithValues = this.state.exercisesWithValues;

        this.state.exercises.forEach((exercise, index) => {
            if (!exercisesWithValues[index]) {
                exercisesWithValues[index] = {
                    name: exercise.name
                }
            }
        });

        exercisesWithValues = exercisesWithValues.map(exercise => ({
            ...exercise,
            series: exercise.series || DEFAULT_SERIES_COUNT,
            repeats: exercise.repeats || DEFAULT_REPEATS_COUNT,
        }));

        this.setState({exercisesWithValues});
    }

    _fetchTraining() {
        axios.get(`${GET_TRAINING_DETAILS_ROUTE}/${this.props.location.state.selectedTraining}`).then(res => {
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

    _onPauseInputChange(evt) {
        this.setState({pauseDuration: parseInt(evt.target.value, 10)});
    }

    _onWarmupInputChange(evt) {
        this.setState({warmupDuration: parseInt(evt.target.value, 10) * 60});
    }

    async _onStartButtonClick(evt) {
        await this._fillEmptyExercises();
        this.props.history.push("/tracker-training",
            {
                exercises: this.state.exercisesWithValues,
                pauseDuration: this.state.pauseDuration,
                warmupDuration: this.state.warmupDuration,
                trainingName: this.state.training.name
            });
    }

    _onSeriesSelectChange(evt, index) {
        const newExercisesWithValues = this.state.exercisesWithValues;

        newExercisesWithValues[index] = {
            ...newExercisesWithValues[index], series: evt.target.value
        }

        this.setState({exercisesWithValues: newExercisesWithValues});
    }

    _onRepeatsInputChange(evt, index) {
        const newExercisesWithValues = this.state.exercisesWithValues;

        newExercisesWithValues[index] = {
            ...newExercisesWithValues[index], repeats: evt.target.value
        }

        this.setState({exercisesWithValues: newExercisesWithValues});
    }

    render() {
        return (
            <div className="TrackerConfigPage">
                <Header/>
                <h2 className={"title"}>{this.state.training.name}</h2>
                {
                    this.state.exercises.map((exercise, index) => {
                        return (
                            <div className={"TrackerConfigPage__exercise"} key={exercise.id}>
                                <div className={"TrackerConfigPage__exercise-label"}>{exercise.name}</div>
                                <div className={"TrackerConfigPage__exercise-controls"}>
                                    <div className={"TrackerConfigPage__exercise-series-select"}>
                                        <SelectControl className={"TrackerConfigPage__exercise-series-select"}
                                                       options={SERIES_TO_CHOOSE}
                                                       labelDefault={"Ilość serii"}
                                                       onChange={(evt) => this._onSeriesSelectChange(evt, index)}/>
                                    </div>
                                    <div className={"TrackerConfigPage__exercise-weight-input"}>
                                        <InputControl placeholder={DEFAULT_REPEATS_COUNT}
                                                      onChange={(evt) => this._onRepeatsInputChange(evt, index)}/>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

                <div className={"TrackerConfigPage__config-item"}>
                    <div className={"TrackerConfigPage__config-item-label"}>Rozgrzewka</div>
                    <div className={"TrackerConfigPage__config-item-input"}>
                        <InputControl placeholder={5} onChange={this._onWarmupInputChangeBind}/>
                    </div>
                    <div className={"TrackerConfigPage__config-item-unit"}>
                        min
                    </div>
                </div>

                <div className={"TrackerConfigPage__config-item"}>
                    <div className={"TrackerConfigPage__config-item-label"}>Przerwa</div>
                    <div className={"TrackerConfigPage__config-item-input"}>
                        <InputControl placeholder={90} onChange={this._onPauseInputChangeBind}/>
                    </div>
                    <div className={"TrackerConfigPage__config-item-unit"}>
                        sek
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
