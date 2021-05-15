import React from 'react';
import './TrainingsPage.scss';
import Section from "../../sections/Section/Section";
import SectionButton from "../../sections/SectionButton/SectionButton";
import Header from "../../sections/Header/Header";
import ButtonControl from "../../controls/ButtonControl/ButtonControl";
import axios from "axios";
import {Link} from "react-router-dom";

const GET_TRAININGS_ROUTE = "/api/trainings";

class TrainingsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            trainings: []
        }
    }

    componentDidMount() {
        this._fetchTrainings();
    }

    render() {
        return (
            <div className="TrainingsPage">
                <Header/>
                <Section title={"Moje treningi"}/>
                {
                    this.state.trainings.map((training, index) => {
                        return <SectionButton title={training.name}
                                          brief={training.exercisesIds?.join(", ")}
                                          key={index}
                                          icon={"trainings"}/>
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
