import React from 'react';
import './TrackerTrainingPage.scss';
import { FaStopwatch } from "react-icons/fa";
import { FaBurn } from "react-icons/fa";
import Header from "../../sections/Header/Header";
import ButtonControl from "../../controls/ButtonControl/ButtonControl";
import { BiDumbbell } from 'react-icons/bi';

class TrackerTrainingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            exercises: {}
        };
    }

    componentDidMount() {
        this.setState({exercises: this.props.location.state.exercises});
    }

    render() {
        return (
            <div className="TrackerTrainingPage">
                <Header/>
                <div className={"TrackerTrainingPage__slider"}>
                    <div className={"TrackerTrainingPage__slider-timeline"}></div>
                    <div className={"TrackerTrainingPage__slider-item"}>
                        <BiDumbbell/>
                    </div>
                    <div className={"TrackerTrainingPage__slider-item"}>
                        <BiDumbbell/>
                    </div>
                    <div className={"TrackerTrainingPage__slider-item"}>
                        <BiDumbbell/>
                    </div>
                </div>
                <h2 className={"title"}>{Object.keys(this.state.exercises)[0]}</h2>
                {/*{*/}
                {/*    Object.keys(this.state.exercises).map(exerciseName => {*/}
                {/*        return <div>*/}
                {/*            <div>{exerciseName}</div>*/}
                {/*            <div>{this.state.exercises[exerciseName].series}</div>*/}
                {/*            <div>{this.state.exercises[exerciseName].repeats}</div>*/}
                {/*        </div>*/}
                {/*    })*/}
                {/*}*/}
                <div className={"TrackerTrainingPage__cards"}>
                    <div className={"TrackerTrainingPage__card"}>
                        <div className={"TrackerTrainingPage__card-title"}>Seria</div>
                        <div className={"TrackerTrainingPage__card-value"}>2</div>
                        <div className={"TrackerTrainingPage__card-progress"}>
                            <div className=
                                     {"TrackerTrainingPage__card-progress-item TrackerTrainingPage__card-progress-item--filled"}>
                            </div>
                            <div className=
                                     {"TrackerTrainingPage__card-progress-item TrackerTrainingPage__card-progress-item--filled"}>
                            </div>
                            <div className={"TrackerTrainingPage__card-progress-item"}></div>
                        </div>
                    </div>
                    <div className={"TrackerTrainingPage__card"}>
                        <div className={"TrackerTrainingPage__card-title"}>Powtórzenia</div>
                        <div className={"TrackerTrainingPage__card-value"}>12</div>
                    </div>
                    <div className={"TrackerTrainingPage__card"}>
                        <div className={"TrackerTrainingPage__card-title"}>Czas ćwiczenia</div>
                        <div className={"TrackerTrainingPage__card-value"}>1:20</div>
                    </div>
                    <div className={"TrackerTrainingPage__card"}>
                        <div className={"TrackerTrainingPage__card-title"}>Kategoria</div>
                        <div className={"TrackerTrainingPage__card-value"}>Plecy</div>
                    </div>
                </div>
                <div className={"TrackerTrainingPage__cards TrackerTrainingPage__cards--highlight"}>
                    <div className={"TrackerTrainingPage__card-icon"}>
                        <div className={"TrackerTrainingPage__card-icon-icon"}>
                            <FaStopwatch/>
                        </div>
                        <div className={"TrackerTrainingPage__card-icon-value"}>12:32</div>
                    </div>
                    <div className={"TrackerTrainingPage__card-icon"}>
                        <div className={"TrackerTrainingPage__card-icon-icon"}>
                            <FaBurn/>
                        </div>
                        <div className={"TrackerTrainingPage__card-icon-value"}>113</div>
                    </div>
                </div>
                <ButtonControl value={"Następne ćwiczenie"}/>
                <ButtonControl value={"Zakończ trening"} type={"secondary"}/>
            </div>
        )
    }
}


TrackerTrainingPage.propTypes = {};

TrackerTrainingPage.defaultProps = {};

export default TrackerTrainingPage;
