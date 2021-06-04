import React from "react";

import "./AddTrainingPage.scss";
import { ADD_TRAINING_ROUTE, AVAILABLE_TRAINING_DAYS } from  "./AddTrainingPage.consts";

import Header from "../../sections/Header/Header";
import ButtonControl from "../../controls/ButtonControl/ButtonControl";
import axios from "axios";
import InputControl from "../../controls/InputControl/InputControl";
import classnames from "classnames";
import MultipleChoiceControl from "../../controls/MultipleChoiceControl/MultipleChoiceControl";
import ListControl from "../../controls/ListControl/ListControl";

const GET_EXERCISES_ROUTE = "/api/exercises";
const GET_CATEGORIES_ROUTE = "/api/categories";

class AddTrainingPage extends React.Component {

    constructor(props) {
        super(props);

        this._trainingDays = [];

        this._onListSortBind = this._onListSort.bind(this);
        this._onListItemStateChangedBind = this._onListItemStateChanged.bind(this);
        this._onItemsChangeBind = this._onItemsChange.bind(this);

        this.state = {
            name: "",
            exercises: [],
            categories: [],
            errors: {},
            listItems: [],
            pickedExercisesFromList: [],
            trainingDays: []
        }
    }

    componentDidMount() {
        this._fetchExercises();
        this._fetchCategories();
        this.setState({trainingDays: AVAILABLE_TRAINING_DAYS});
    }

    _fetchExercises() {
        axios.get(GET_EXERCISES_ROUTE).then(res => {
            this.setState(({exercises: res.data}))
            const listItems = this.state.exercises.map(exercise => ({name: exercise.name, value: exercise._id}));
            this.setState({listItems});
        }).catch(err => {
            console.log(err);
        });
    }

    _fetchCategories() {
        axios.get(GET_CATEGORIES_ROUTE).then(res => {
            const categoriesToOptionsFormatted = res.data.map(category => ({ ...category, value: category._id}));
            this.setState({categories: categoriesToOptionsFormatted});
        }).catch(err => {
            console.log(err);
        });
    }

    _onChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    _onListSort(value) {
        const newItems = this.state.exercises
            .filter(exercise => exercise.categoriesIds.includes(value))
            .map(exercise => ({name: exercise.name, value: exercise._id}));

        this.setState({listItems: newItems});
    }

    _onListItemStateChanged(pickedItemsValues) {
        this.setState({pickedExercisesFromList: pickedItemsValues});
    }

    _onItemsChange(items) {
        this._trainingDays = items;
    }

    _onSubmit(event) {
        event.preventDefault();

        const trainingDays = this._trainingDays
            .filter(day => day.active === true)
            .map(day => day.name);

        const newTrainingPayload = {
            name: this.state.name,
            authorId: "1",
            exercisesIds: this.state.pickedExercisesFromList,
            trainingDays: trainingDays
        };

        axios.post(ADD_TRAINING_ROUTE, newTrainingPayload)
            .then(res => this.props.history.push("/trainings"))
            .catch(err =>
                console.log(err)
            );
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="AddTrainingPage">
                <Header/>
                <h2 className={"title"}>Dodaj trening</h2>
                <form className={"AddTrainingPage__form"} onSubmit={this._onSubmit.bind(this)}>
                    <InputControl placeholder={"Nazwa"}
                                  value={this.state.name}
                                  error={errors.name}
                                  id={"name"}
                                  onChange={this._onChange.bind(this)}
                                  className={classnames("", {
                                      invalid: errors.name
                                  })}
                    />
                    <MultipleChoiceControl items={this.state.trainingDays}
                                           onItemsChange={this._onItemsChangeBind}/>
                    <ListControl
                        items={this.state.listItems}
                        searchableItems={this.state.categories}
                        searchable={true}
                        onSort={this._onListSortBind}
                        onItemStateChanged={this._onListItemStateChangedBind}/>
                    <ButtonControl value={"Dodaj"}/>
                </form>
            </div>
        )
    }
}

AddTrainingPage.propTypes = {};

AddTrainingPage.defaultProps = {};

export default AddTrainingPage;
