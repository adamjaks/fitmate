import React from 'react';
import './ExercisesPage.scss';
import SectionButton from "../../sections/SectionButton/SectionButton";
import Header from "../../sections/Header/Header";
import ButtonControl from "../../controls/ButtonControl/ButtonControl";
import axios from "axios";
import {Link} from "react-router-dom";
import SelectControl from "../../controls/SelectControl/SelectControl";

const GET_EXERCISES_ROUTE = "https://fitmate-server.herokuapp.com/api/exercises";
const GET_CATEGORIES_ROUTE = "https://fitmate-server.herokuapp.com/api/categories";

class ExercisesPage extends React.Component {

    constructor(props) {
        super(props);

        this._onExerciseClickBind = this._onExerciseClick.bind(this);
        this._onSelectChangeBind = this._onSelectChange.bind(this);

        this.state = {
            exercises: [],
            exercisesFiltered: [],
            categories: []
        }
    }

    componentDidMount() {
        this._fetchExercises();
        this._fetchCategories();
    }

    _onExerciseClick(evt) {
        this.props.history.push(`/exercises/details/${evt.props.exerciseId}`);
    }

    _onSelectChange(evt) {
        if (evt.target.value === "blank") {
            this.setState({exercisesFiltered: this.state.exercises});
            return;
        }

        const exercisesFiltered = this.state.exercises
            .filter(exercise => exercise.categoriesIds.includes(evt.target.value));

        this.setState({exercisesFiltered: exercisesFiltered});
    }

    _fetchExercises() {
        axios.get(GET_EXERCISES_ROUTE).then(res => {
            this.setState(({exercises: res.data, exercisesFiltered: res.data}))
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

    _getBriefCategories(categoriesIds) {
        return this.state.categories
            .filter(category => categoriesIds.includes(category._id))
            .map(category => category.name)
            .join(", ");
    }

    // todo: filtering via category
    render() {
        return (
            <div className="ExercisesPage">
                <Header/>
                <h2 className={"title"}>Atlas ćwiczeń</h2>
                <SelectControl options={this.state.categories} onChange={this._onSelectChangeBind}/>
                {
                    this.state.exercisesFiltered.map((exercise, i) => {
                        return <SectionButton title={exercise.name}
                                          brief={this._getBriefCategories(exercise.categoriesIds)}
                                          key={i}
                                          icon={"exercises"}
                                          onClick={this._onExerciseClickBind}
                                          exerciseId={exercise._id} />
                    })
                }
                <Link to={"/exercises/add"}>
                    <ButtonControl value={"Dodaj ćwiczenie"}/>
                </Link>

            </div>
        )
    }
}

ExercisesPage.propTypes = {};

ExercisesPage.defaultProps = {};

export default ExercisesPage;
