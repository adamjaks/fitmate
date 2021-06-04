import React from 'react';
import './AddExercisePage.scss';
import Header from "../../sections/Header/Header";
import ButtonControl from "../../controls/ButtonControl/ButtonControl";
import axios from "axios";
import InputControl from "../../controls/InputControl/InputControl";
import classnames from "classnames";
import MultipleChoiceControl from "../../controls/MultipleChoiceControl/MultipleChoiceControl";
import TextareaControl from "../../controls/TextareaControl/TextareaControl";
import ListControl from "../../controls/ListControl/ListControl";

const ADD_EXERCISE_ROUTE = "/api/exercises/add";
const GET_CATEGORIES_ROUTE = "/api/categories";

class AddExercisePage extends React.Component {

    constructor(props) {
        super(props);

        this._onItemsChangeBind = this._onItemsChange.bind(this);

        this._categories = [];

        this.state = {
            name: "",
            description: "",
            errors: {},
            categories: []
        }
    }

    componentDidMount() {
        this._fetchCategories();
    }

    _fetchCategories() {
        axios.get(GET_CATEGORIES_ROUTE).then(res => {
            const categories = res.data.map(category => (
                    {...category, value: category._id}
                )
            );
            this.setState({categories});
        }).catch(err => {
            console.log(err);
        });
    }

    _onChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    _onSubmit(event) {
        event.preventDefault();
        const categoriesIds = this._categories
            .filter(category => category.active === true)
            .map(category => category._id);

        const newExercisePayload = {
            name: this.state.name,
            description: this.state.description,
            categoriesIds
        };

        axios.post(ADD_EXERCISE_ROUTE, newExercisePayload)
            .then(res => this.props.history.push("/exercises"))
            .catch(err =>
                console.log(err)
            );
    }

    _onItemsChange(items) {
        this._categories = items;
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="AddExercisePage">
                <Header/>
                <h2 className={"title"}>Dodaj ćwiczenie</h2>
                <form className={"AddExercisePage__form"} onSubmit={this._onSubmit.bind(this)}>
                    <div className={"form__section"}>
                        <InputControl placeholder={"Nazwa"}
                                      value={this.state.name}
                                      error={errors.name}
                                      id={"name"}
                                      onChange={this._onChange.bind(this)}
                                      className={classnames("", {
                                          invalid: errors.name
                                      })}
                        />
                    </div>
                    <div className={"form__section"}>
                        <MultipleChoiceControl items={this.state.categories} onItemsChange={this._onItemsChangeBind}/>
                    </div>
                    <div className={"form__section"}>
                        <TextareaControl placeholder={"Opis"}
                                         value={this.state.description}
                                         error={errors.description}
                                         id={"description"}
                                         onChange={this._onChange.bind(this)}
                                         className={classnames("", {
                                             invalid: errors.name
                                         })}
                        />
                    </div>
                    <ButtonControl value={"Dodaj"}/>
                </form>
            </div>
        )
    }
}

AddExercisePage.propTypes = {};

AddExercisePage.defaultProps = {};

export default AddExercisePage;
