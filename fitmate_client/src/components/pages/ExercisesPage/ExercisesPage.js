import React from 'react';
import PropTypes from 'prop-types';
import './ExercisesPage.scss';
import Section from "../../sections/Section/Section";
import SectionButton from "../../sections/SectionButton/SectionButton";
import Header from "../../sections/Header/Header";
import ButtonControl from "../../controls/ButtonControl/ButtonControl";
import axios from "axios";
import {Link} from "react-router-dom";

const GET_EXERCISES_ROUTE = "/api/exercises";

class ExercisesPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            exercises: []
        }
    }

    componentDidMount() {
        this._fetchExercises();
    }

    // todo: filtering via category

    render() {
        return (
            <div className="ExercisesPage">
                <Header/>
                <Section title={"Baza ćwiczeń"}/>
                {
                    this.state.exercises.map((exercise, index) => {
                        return <SectionButton title={exercise.name}
                                          brief={exercise.description | ""}
                                          key={index}
                                          icon={"exercises"}/>
                    })
                }
                <Link to={"/exercises/add"}>
                    <ButtonControl value={"Dodaj ćwiczenie"}/>
                </Link>

            </div>
        )
    }

    _fetchExercises() {
        axios.get(GET_EXERCISES_ROUTE).then(res => {
            this.setState(({exercises: res.data}))
        }).catch(err => {
            console.log(err);
        });
    }
}

ExercisesPage.propTypes = {};

ExercisesPage.defaultProps = {};

export default ExercisesPage;
