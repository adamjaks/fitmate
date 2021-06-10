import React from "react";

import "./EditTrainingPage.scss";

import Header from "../../sections/Header/Header";
import ButtonControl from "../../controls/ButtonControl/ButtonControl";
import axios from "axios";
import InputControl from "../../controls/InputControl/InputControl";
import classnames from "classnames";
import ListControl from "../../controls/ListControl/ListControl";

const EDIT_TRAINING_ROUTE = "/api/trainings/edit";

const GET_EXERCISES_ROUTE = "/api/exercises";
const GET_CATEGORIES_ROUTE = "/api/categories";

class EditTrainingPage extends React.Component {

    constructor(props) {
        super(props);

        this._onListSortBind = this._onListSort.bind(this);
        this._onListItemStateChangedBind = this._onListItemStateChanged.bind(this);

        this.state = {
            name: "",
            exercises: [],
            categories: [],
            errors: {},
            listItems: [],
            pickedExercisesFromList: [],
        }
    }

    componentDidMount() {
        this._fetchExercises();
        this._fetchCategories();
        this.setState({...this.props.location.state})
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
        if (value === "blank") {
            this.setState({listItems: this.state.exercises});
            return;
        }

        const newItems = this.state.exercises
            .filter(exercise => exercise.categoriesIds.includes(value))
            .map(exercise => ({name: exercise.name, value: exercise._id}));

        this.setState({listItems: newItems});
    }

    _onListItemStateChanged(pickedItemsValues) {
        this.setState({pickedExercisesFromList: pickedItemsValues});
    }

    _onSubmit(event) {
        event.preventDefault();

        const newTrainingPayload = {
            name: this.state.name,
            exercisesIds: this.state.pickedExercisesFromList,
        };

        axios.put(`${EDIT_TRAINING_ROUTE}/${this.state.id}`, newTrainingPayload)
            .then(res => this.props.history.push("/trainings"))
            .catch(err =>
                console.log(err)
            );
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="EditTrainingPage">
                <Header/>
                <h2 className={"title"}>Edytuj trening</h2>
                <form className={"EditTrainingPage__form"} onSubmit={this._onSubmit.bind(this)}>
                    <InputControl placeholder={"Nazwa"}
                                  value={this.state.name}
                                  error={errors.name}
                                  id={"name"}
                                  onChange={this._onChange.bind(this)}
                                  className={classnames("", {
                                      invalid: errors.name
                                  })}
                    />
                    <ListControl
                        items={this.state.listItems}
                        searchableItems={this.state.categories}
                        searchable={true}
                        onSort={this._onListSortBind}
                        onItemStateChanged={this._onListItemStateChangedBind}/>
                    <ButtonControl value={"Aktualizuj"}/>
                </form>
            </div>
        )
    }
}

EditTrainingPage.propTypes = {};

EditTrainingPage.defaultProps = {};

export default EditTrainingPage;
