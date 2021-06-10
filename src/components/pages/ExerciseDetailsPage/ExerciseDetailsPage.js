import React from 'react';
import './ExerciseDetailsPage.scss';
import Section from "../../sections/Section/Section";
import Header from "../../sections/Header/Header";
import ButtonControl from "../../controls/ButtonControl/ButtonControl";
import axios from "axios";
import ListControl from "../../controls/ListControl/ListControl";

const GET_EXERCISE_DETAILS_ROUTE = "/api/exercises/details";
const GET_CATEGORIES_ROUTE = "/api/categories";
const DELETE_EXERCISE_ROUTE = "/api/exercises/delete";

class ExerciseDetailsPage extends React.Component {

    constructor(props) {
        super(props);

        this._onButtonDeleteClickBind = this._onButtonDeleteClick.bind(this);
        this._onButtonEditClickBind = this._onButtonEditClick.bind(this);

        this.state = {
            name: "",
            description: "",
            categoriesIds: [],
            categoriesNames: []
        }
    }

    componentDidMount() {
        this._fetchExerciseData();
    }

    _fetchExerciseData() {
        axios.get(`${GET_EXERCISE_DETAILS_ROUTE}/${this.props.match.params.exerciseId}`).then(res => {
            this.setState({...res.data})
            this._getCategoriesNames();
        }).catch(err => {
            console.log(err);
        });
    }

    _getCategoriesNames() {
        axios.get(GET_CATEGORIES_ROUTE).then(res => {
            const categories = res.data;
            const categoriesNames = categories
                .filter(category => this.state.categoriesIds.includes(category._id))
                .map(category => category.name);
            this.setState({categoriesNames})
        }).catch(err => {
            console.log(err);
        });
    }

    _onButtonDeleteClick() {
        axios.delete(`${DELETE_EXERCISE_ROUTE}/${this.props.match.params.exerciseId}`).then(res => {
            this.props.history.push("/exercises")
        }).catch(err => {
            console.log(err);
        });
    }

    _onButtonEditClick() {
        this.props.history.push("/exercises/edit", {
            ...this.state,
            id: this.props.match.params.exerciseId
        });
    }

    render() {
        return (
            <div className="ExerciseDetailsPage">
                <Header/>
                <h2 className={"title"}>{this.state.name}</h2>
                <Section>
                    <div className={"ExerciseDetailsPage__categories"}>
                        { this.state.categoriesNames.map(category => {
                            return (
                                <div className={"ExerciseDetailsPage__category-item"} key={category}>
                                    {category}
                                </div>
                            )
                        })}
                    </div>
                    <div className={"ExerciseDetailsPage__description"}>
                        {this.state.description}
                    </div>
                </Section>
                <ButtonControl
                    value={"Edytuj ćwiczenie"}
                    type={"secondary"}
                    onClick={this._onButtonEditClickBind}/>
                <ButtonControl
                    value={"Usuń ćwiczenie"}
                    type={"danger"}
                    onClick={this._onButtonDeleteClickBind}/>
            </div>
        )
    }

}

ExerciseDetailsPage.propTypes = {};

ExerciseDetailsPage.defaultProps = {};

export default ExerciseDetailsPage;
