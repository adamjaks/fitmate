import React from 'react';
import './AddExercisePage.scss';
import Header from "../../sections/Header/Header";
import ButtonControl from "../../controls/ButtonControl/ButtonControl";
import axios from "axios";
import InputControl from "../../controls/InputControl/InputControl";
import classnames from "classnames";

const ADD_EXERCISE_ROUTE = "/api/exercises/add";

class AddExercisePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            categoriesIds: [],
            errors: {}
        }
    }

    _onChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    _onSubmit(event) {
        event.preventDefault();

        // todo: category form
        const newExercisePayload = {
            name: this.state.name,
            description: "",
            categoriesIds: []
        };

        axios.post(ADD_EXERCISE_ROUTE, newExercisePayload)
            .then(res => this.props.history.push("/exercises"))
            .catch(err =>
                console.log(err)
            );
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="AddExercisePage">
                <Header/>
                <form className={"AddExercisePage__form"} onSubmit={this._onSubmit.bind(this)}>
                    <InputControl placeholder={"Nazwa ćwiczenia"}
                                  value={this.state.name}
                                  error={errors.name}
                                  id={"name"}
                                  onChange={this._onChange.bind(this)}
                                  className={classnames("", {
                                      invalid: errors.name
                                  })}
                    />
                    <InputControl placeholder={"Kategorie (TBD)"}
                                  value={this.state.categoriesIds}
                                  id={"exercises"}
                                  onChange={this._onChange.bind(this)}
                                  className={classnames("", {
                                      invalid: errors.password || errors.passwordincorrect
                                  })}
                    />
                    <ButtonControl value={"Dodaj ćwiczenie"}/>
                </form>
            </div>
        )
    }
}

AddExercisePage.propTypes = {};

AddExercisePage.defaultProps = {};

export default AddExercisePage;
