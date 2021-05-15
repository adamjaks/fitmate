import React from 'react';
import './AddTrainingPage.scss';
import Header from "../../sections/Header/Header";
import ButtonControl from "../../controls/ButtonControl/ButtonControl";
import axios from "axios";
import InputControl from "../../controls/InputControl/InputControl";
import classnames from "classnames";

const ADD_TRAINING_ROUTE = "/api/trainings/add";

class AddTrainingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            exercises: [],
            errors: {}
        }
    }

    _onChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    _onSubmit(event) {
        event.preventDefault();

        // todo: authorIds and exercises form
        const newTrainingPayload = {
            name: this.state.name,
            authorId: "1",
            exercisesIds: []
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
                <form className={"AddTrainingPage__form"} onSubmit={this._onSubmit.bind(this)}>
                    <InputControl placeholder={"Nazwa treningu"}
                                  value={this.state.name}
                                  error={errors.name}
                                  id={"name"}
                                  onChange={this._onChange.bind(this)}
                                  className={classnames("", {
                                      invalid: errors.name
                                  })}
                    />
                    <InputControl placeholder={"Cwiczenia (TBD)"}
                                  value={this.state.exercises}
                                  id={"exercises"}
                                  onChange={this._onChange.bind(this)}
                                  className={classnames("", {
                                      invalid: errors.password || errors.passwordincorrect
                                  })}
                    />
                    <ButtonControl value={"Dodaj trening"}/>
                </form>
            </div>
        )
    }
}

AddTrainingPage.propTypes = {};

AddTrainingPage.defaultProps = {};

export default AddTrainingPage;
