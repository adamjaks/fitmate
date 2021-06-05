import React from 'react';
import './TrainingsPage.scss';
import SectionButton from "../../sections/SectionButton/SectionButton";
import Header from "../../sections/Header/Header";
import ButtonControl from "../../controls/ButtonControl/ButtonControl";
import axios from "axios";
import {Link} from "react-router-dom";
import InputControl from "../../controls/InputControl/InputControl";

const GET_TRAININGS_ROUTE = "/api/trainings";

class TrainingsPage extends React.Component {

    constructor(props) {
        super(props);

        this._onTrainingClickBind = this._onTrainingClick.bind(this);

        this.state = {
            trainings: []
        }
    }

    componentDidMount() {
        this._fetchTrainings();
    }

    _onTrainingClick(evt) {
        this.props.history.push(`/trainings/details/${evt.props.trainingId}`);
    }

    render() {
        return (
            <div className="TrainingsPage">
                <Header/>
                <h2 className={"title"}>Treningi</h2>
                <InputControl placeholder="Nazwa treningu" type="search"/>
                {
                    this.state.trainings.map((training, index) => {
                        return <SectionButton title={training.name}
                                          brief={training.exercisesIds?.join(", ")}
                                          key={index}
                                          icon={"trainings"}
                                          onClick={this._onTrainingClickBind}
                                          trainingId={training._id}/>
                    })
                }
                <Link to={"/trainings/add"}>
                    <ButtonControl value={"Dodaj trening"}/>
                </Link>

            </div>
        )
    }

    _fetchTrainings() {
        axios.get(GET_TRAININGS_ROUTE).then(res => {
            this.setState(({trainings: res.data}))
        }).catch(err => {
            console.log(err);
        });
    }
}

TrainingsPage.propTypes = {};

TrainingsPage.defaultProps = {};

export default TrainingsPage;
