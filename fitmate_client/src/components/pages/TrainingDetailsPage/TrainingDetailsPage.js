import React from 'react';
import './TrainingDetailsPage.scss';
import Section from "../../sections/Section/Section";
import Header from "../../sections/Header/Header";
import ButtonControl from "../../controls/ButtonControl/ButtonControl";
import axios from "axios";

const GET_TRAINING_DETAILS_ROUTE = "/api/trainings/details";
const DELETE_TRAINING_ROUTE = "/api/trainings/delete";

class TrainingDetailsPage extends React.Component {

    constructor(props) {
        super(props);

        this._onButtonDeleteClickBind = this._onButtonDeleteClick.bind(this);
        this._onButtonEditClickBind = this._onButtonEditClick.bind(this);

        this.state = {
            authorId: "",
            name: "",
            exercisesIds: [],
            trainingDays: [],
            date: null
        }
    }

    componentDidMount() {
        this._fetchTrainingData();
    }

    _fetchTrainingData() {
        axios.get(`${GET_TRAINING_DETAILS_ROUTE}/${this.props.match.params.trainingId}`).then(res => {
            this.setState({...res.data})
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
        //
    }

    // todo: filtering via category
    render() {
        return (
            <div className="TrainingDetailsPage">
                <Header/>
                <h2 className={"title"}>{this.state.name}</h2>
                <Section>
                    Cwiczenia:
                    { this.state.exercisesIds }
                    Dni:
                    { this.state.trainingDays }
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
