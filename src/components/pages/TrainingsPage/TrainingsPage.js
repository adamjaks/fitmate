import React from 'react';
import './TrainingsPage.scss';
import SectionButton from "../../sections/SectionButton/SectionButton";
import Header from "../../sections/Header/Header";
import ButtonControl from "../../controls/ButtonControl/ButtonControl";
import axios from "axios";
import {Link} from "react-router-dom";
import InputControl from "../../controls/InputControl/InputControl";

const GET_TRAININGS_ROUTE = "/api/trainings";
const GET_EXERCISES_ROUTE = "/api/exercises";

class TrainingsPage extends React.Component {

    constructor(props) {
        super(props);

        this._onTrainingClickBind = this._onTrainingClick.bind(this);

        this.state = {
            trainings: [],
            exercises: []
        }
    }

    componentDidMount() {
        this._fetchTrainings();
        this._fetchExercises();
    }

    _onTrainingClick(evt) {
        this.props.history.push(`/trainings/details/${evt.props.trainingId}`);
    }

    _fetchTrainings() {
        axios.get(GET_TRAININGS_ROUTE).then(res => {
            this.setState(({trainings: res.data}))
        }).catch(err => {
            console.log(err);
        });
    }

    _fetchExercises() {
        axios.get(GET_EXERCISES_ROUTE).then(res => {
            this.setState(({exercises: res.data}))
        }).catch(err => {
            console.log(err);
        });
    }

    _getBriefExercises(exercisesIds) {
        return this.state.exercises
            .filter(exercise => exercisesIds.includes(exercise._id))
            .map(exercise => exercise.name)
            .join(", ");
    }


    render() {
        return (
            <div className="TrainingsPage">
                <Header/>
                <h2 className={"title"}>Treningi</h2>
                {/*<InputControl placeholder="Nazwa treningu" type="search"/>*/}
                {
                    this.state.trainings.map((training, index) => {
                        return <SectionButton title={training.name}
                                          brief={this._getBriefExercises(training.exercisesIds)}
                                          key={index}
                                          icon={"trainings"}
                                          onClick={this._onTrainingClickBind}
                                          trainingId={training._id}/>
                    })
                }
                <Link to={"/trainings/add"}>
                    <ButtonControl value={"Dodaj trening"}/>
                </Link>

            </div>
        )
    }
}

TrainingsPage.propTypes = {};

TrainingsPage.defaultProps = {};

export default TrainingsPage;
