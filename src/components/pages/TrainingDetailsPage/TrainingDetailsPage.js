import React from 'react';
import './TrainingDetailsPage.scss';
import Section from "../../sections/Section/Section";
import Header from "../../sections/Header/Header";
import ButtonControl from "../../controls/ButtonControl/ButtonControl";
import axios from "axios";
import { BiDumbbell } from "react-icons/bi";

const GET_TRAINING_DETAILS_ROUTE = "https://fitmate-server.herokuapp.com/api/trainings/details";
const GET_EXERCISES_ROUTE = "https://fitmate-server.herokuapp.com/api/exercises/";
const DELETE_TRAINING_ROUTE = "https://fitmate-server.herokuapp.com/api/trainings/delete";

class TrainingDetailsPage extends React.Component {

    constructor(props) {
        super(props);

        this._onButtonDeleteClickBind = this._onButtonDeleteClick.bind(this);
        this._onButtonEditClickBind = this._onButtonEditClick.bind(this);

        this.state = {
            authorId: "",
            name: "",
            exercisesIds: [],
            date: null,
            exercisesNames: []
        }
    }

    componentDidMount() {
        this._fetchTrainingData();
    }

    _fetchTrainingData() {
        axios.get(`${GET_TRAINING_DETAILS_ROUTE}/${this.props.match.params.trainingId}`).then(res => {
            this.setState({...res.data});
            this._getExercisesNames();
        }).catch(err => {
            console.log(err);
        });
    }

    _getExercisesNames() {
        axios.get(GET_EXERCISES_ROUTE).then(res => {
            const exercises = res.data;
            const exercisesNames = exercises
                .filter(exercise => this.state.exercisesIds.includes(exercise._id))
                .map(exercise => exercise.name);
            this.setState({exercisesNames})
        }).catch(err => {
            console.log(err);
        });
    }

    _onButtonDeleteClick() {
        axios.delete(`${DELETE_TRAINING_ROUTE}/${this.props.match.params.trainingId}`).then(res => {
            this.props.history.push("/trainings")
        }).catch(err => {
            console.log(err);
        });
    }

    _onButtonEditClick() {
        this.props.history.push("/trainings/edit", {
            ...this.state,
            id: this.props.match.params.trainingId
        });
    }

    render() {
        return (
            <div className="TrainingDetailsPage">
                <Header/>
                <h2 className={"title"}>{this.state.name}</h2>
                <Section>
                    { this.state.exercisesNames.map((exerciseName, i) => {
                        return (
                            <div className={"TrainingDetailsPage__exercise"} key={i}>
                                <div className={"TrainingDetailsPage__exercise-icon"}>
                                    <BiDumbbell />
                                </div>
                                <div className={"TrainingDetailsPage__exercise-label"}>
                                    { exerciseName }
                                </div>
                            </div>
                        )
                    }) }
                </Section>
                <ButtonControl
                    value={"Edytuj trening"}
                    type={"secondary"}
                    onClick={this._onButtonEditClickBind}/>
                <ButtonControl
                    value={"Usuń trening"}
                    type={"danger"}
                    onClick={this._onButtonDeleteClickBind}/>
            </div>
        )
    }

}

TrainingDetailsPage.propTypes = {};

TrainingDetailsPage.defaultProps = {};

export default TrainingDetailsPage;
