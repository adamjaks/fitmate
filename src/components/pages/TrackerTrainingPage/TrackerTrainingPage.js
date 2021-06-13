import React from 'react';
import './TrackerTrainingPage.scss';
import { FaStopwatch } from "react-icons/fa";
import { FaBurn } from "react-icons/fa";
import Header from "../../sections/Header/Header";
import ButtonControl from "../../controls/ButtonControl/ButtonControl";
import { BiDumbbell } from 'react-icons/bi';
import classnames from "classnames";
import axios from "axios";

const ADD_TRAINING_DAY_ROUTE = "https://fitmate-server.herokuapp.com/api/training-days/add";

class TrackerTrainingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exercises: {},
            pauseDuration: 0,
            warmupDuration: 0,
            timerExercise: null,
            timerExerciseValue: 0,
            timerTraining: null,
            timerTrainingValue: 0,
            timerPause: null,
            timerPauseValue: null,
            activeExerciseId: 0,
            inPauseState: false,
            burnedCalories: 0,
            currentExerciseSeries: 0
        };

        this._onNextButtonClickBind = this._onNextButtonClick.bind(this);
        this._onEndButtonClickBind = this._onEndButtonClick.bind(this);
    }

    componentDidMount() {
        this.setState(
            {
                exercises: this.props.location.state.exercises,
                timerPauseValue: this.props.location.state.pauseDuration,
                warmupDuration: this.props.location.state.warmupDuration,
                currentExerciseSeries: this.state.currentExerciseSeries + 1
            });
        this._startExerciseTimer();
        this._startTrainingTimer();
    }

    componentWillUnmount() {
        this.setState({timerExercise: null, timerTraining: null});
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

    _startExerciseTimer() {
        const timer = setInterval(() => {
            this.setState({timerExerciseValue: this.state.timerExerciseValue + 1});
        }, 1000);

        this.setState({timerExercise: timer});
    }

    _startTrainingTimer() {
        const timer = setInterval(() => {
            this.setState({
                timerTrainingValue: this.state.timerTrainingValue + 1,
                burnedCalories: this._calculateCalories(this.state.timerTrainingValue),
            });
        }, 1000);

        this.setState({timerTraining: timer});
    }

    async _startPauseTimer() {
        const timer = setInterval(() => {
            if (this.state.timerPauseValue === 0) {
                this._clearPauseTimer();
            }
            this.setState({timerPauseValue: this.state.timerPauseValue - 1});
        }, 1000);

        this.setState({timerPause: timer});
    }

    _clearPauseTimer() {
        if (this.state.timerPause) {
            this.setState({timerPauseValue: this.props.location.state.pauseDuration});
            clearInterval(this.state.timerPause);
        }
    }

    _getActiveExercise() {
        return this.state.exercises[this.state.activeExerciseId];
    }

    _calculateCalories(duration) {
        return (duration * 0.14583333).toFixed(0);
    }

    _getNextButtonProps() {
        switch (this.state.inPauseState) {
            case true: return {
                value: "Następne ćwiczenie",
                type: "primary"
            }
            case false: return {
                value: "Przerwa",
                type: "warning"
            }
            default: return {
                value: "Następne ćwiczenie",
                type: "primary"
            }
        }
    }

    async _onNextButtonClick() {
        await this.setState({
            inPauseState: !this.state.inPauseState,
            timerExercise: null,
            timerExerciseValue: 0,
        });

        if (this.state.currentExerciseSeries > this._getActiveExercise().series) {
            await this.setState({
                    activeExerciseId: this.state.activeExerciseId + 1,
                    currentExerciseSeries: 1
                }
            );
        } else if (this.state.inPauseState) {
            await this.setState({
                currentExerciseSeries: this.state.currentExerciseSeries + 1
            });
        }

        if (this.state.inPauseState) {
            await this._startPauseTimer();
        } else {
            await this._clearPauseTimer();
        }
    }

    _onEndButtonClick() {
        const newTrainingDayPayload = {
            authorId: '1',
            caloriesBurned: this.state.burnedCalories,
            duration: this.state.timerTrainingValue,
            trainingName: this.props.location.state.trainingName
        }

        axios.post(ADD_TRAINING_DAY_ROUTE, newTrainingDayPayload)
            .then(res => this.props.history.push("/"))
            .catch(err =>
                console.log(err)
            );
    }

    render() {
        const progressItems = [];

        for (let i = 0; i < this._getActiveExercise()?.series; i++) {
            progressItems.push(
                <div className={classnames(
                "TrackerTrainingPage__card-progress-item",
                {"TrackerTrainingPage__card-progress-item--filled": i < this.state.currentExerciseSeries}
            )} key={i}></div>
            );
        }

        return (
            <div className="TrackerTrainingPage">
                <Header/>
                <div className={"TrackerTrainingPage__slider"}>
                    <div className={"TrackerTrainingPage__slider-timeline"} />
                    {Object.keys(this.state.exercises).map((exercise, i) => {
                        return (
                            <div className={classnames(
                                "TrackerTrainingPage__slider-item",
                                {
                                    "TrackerTrainingPage__slider-item--active": i === this.state.activeExerciseId,
                                    "TrackerTrainingPage__slider-item--pause": this.state.inPauseState
                                }
                            )}
                                 style={{left: i * 50}}
                                 key={i}>
                                <BiDumbbell/>
                            </div>
                        )
                    }) }

                </div>
                <h2 className={"title"}>{this.state.inPauseState ? "Przerwa" : this._getActiveExercise()?.name}</h2>
                <div className={"TrackerTrainingPage__cards"}>
                    <div className={classnames(
                        "TrackerTrainingPage__card",
                        {"TrackerTrainingPage__card--pause": this.state.inPauseState}
                    )}>
                        <div className={"TrackerTrainingPage__card-title"}>
                            { !this.state.inPauseState && "Czas ćwiczenia"}
                        </div>
                        <div className={"TrackerTrainingPage__card-value"}>
                            { this.state.inPauseState ?
                                this._formatTime(this.state.timerPauseValue, true) :
                                this._formatTime(this.state.timerExerciseValue)
                            }
                        </div>
                    </div>
                    <div className={classnames(
                        "TrackerTrainingPage__card",
                        {"TrackerTrainingPage__card--hidden": this.state.inPauseState}
                    )}>
                        <div className={"TrackerTrainingPage__card-title"}>Kategoria</div>
                        <div className={"TrackerTrainingPage__card-value"}>
                            Plecy
                        </div>
                    </div>
                    <div className={classnames(
                        "TrackerTrainingPage__card",
                        {"TrackerTrainingPage__card--hidden": this.state.inPauseState}
                    )}>
                        <div className={"TrackerTrainingPage__card-title"}>Seria</div>
                        <div className={"TrackerTrainingPage__card-value"}>
                            { this.state.currentExerciseSeries }
                        </div>
                        <div className={"TrackerTrainingPage__card-progress"}>
                            { progressItems }
                        </div>
                    </div>
                    <div className={classnames(
                        "TrackerTrainingPage__card",
                        {"TrackerTrainingPage__card--hidden": this.state.inPauseState}
                    )}>
                        <div className={"TrackerTrainingPage__card-title"}>Powtórzenia</div>
                        <div className={"TrackerTrainingPage__card-value"}>
                            { this._getActiveExercise()?.repeats }
                        </div>
                    </div>
                </div>
                <div className={"TrackerTrainingPage__cards TrackerTrainingPage__cards--highlight"}>
                    <div className={"TrackerTrainingPage__card-icon"}>
                        <div className={"TrackerTrainingPage__card-icon-icon"}>
                            <FaStopwatch/>
                        </div>
                        <div className={"TrackerTrainingPage__card-icon-value"}>
                            { this._formatTime(this.state.timerTrainingValue) }
                        </div>
                    </div>
                    <div className={"TrackerTrainingPage__card-icon"}>
                        <div className={"TrackerTrainingPage__card-icon-icon"}>
                            <FaBurn/>
                        </div>
                        <div className={"TrackerTrainingPage__card-icon-value"}>
                            { this.state.burnedCalories }
                        </div>
                    </div>
                </div>
                {
                    (this.state.exercises[this.state.activeExerciseId + 1] ||
                    this.state.exercises[this.state.activeExerciseId]?.series > this.state.currentExerciseSeries)
                    &&
                    <ButtonControl {...this._getNextButtonProps()} onClick={this._onNextButtonClickBind}/>
                }
                <ButtonControl value={"Zakończ trening"} type={"secondary"} onClick={this._onEndButtonClickBind}/>
            </div>
        )
    }
}


TrackerTrainingPage.propTypes = {};

TrackerTrainingPage.defaultProps = {};

export default TrackerTrainingPage;
