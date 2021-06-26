import React from 'react';
import './Main.scss';
import Section from "../../sections/Section/Section";
import SectionButton from "../../sections/SectionButton/SectionButton";
import SectionLastTraining from "../../sections/Section/SectionLastTraining/SectionLastTraining";
import Header from "../../sections/Header/Header";
import TrackerButton from "../../sections/TrackerButton/TrackerButton";
import axios from "axios";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

const SECTION_BUTTONS = {
    CALENDAR: "calendar",
    PROGRESS: "progress",
    EXERCISES: "exercises",
    TRAININGS: "trainings",
}

const GET_LAST_TRAINING_PATH = "https://fitmate-server.herokuapp.com/api/training-days/last";
const GET_EXERCISES_ROUTE = "https://fitmate-server.herokuapp.com/api/exercises";
const GET_TRAININGS_ROUTE = "https://fitmate-server.herokuapp.com/api/trainings";

class Main extends React.Component {

    constructor(props) {
        super(props);

        this._onSectionClickBind = this._onSectionClick.bind(this);
        this._onTrackerButtonClickBind = this._onTrackerButtonClick.bind(this);

        this.state = {
            lastTraining: {},
            exercises: "",
            trainings: ""
        }
    }

    componentDidMount() {
        this.fetchLastTraining();
        this.fetchExercises();
        this.fetchTrainings();
    }

    fetchLastTraining() {
        axios.get(`${GET_LAST_TRAINING_PATH}`).then(res => {
            this.setState({lastTraining: res.data});
        }).catch(err => {
            console.log(err);
        });
    }

    fetchExercises() {
        axios.get(GET_EXERCISES_ROUTE).then(res => {
            const exercises = res.data.map(exercise => (exercise.name));
            this.setState({exercises: exercises.join(", ")});
        }).catch(err => {
            console.log(err);
        });
    }

    fetchTrainings() {
        axios.get(GET_TRAININGS_ROUTE).then(res => {
            const trainings = res.data.map(training => (training.name));
            this.setState({trainings: trainings.join(", ")});
        }).catch(err => {
            console.log(err);
        });
    }

    _onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUserAction();
    };

    _onSectionClick(evt) {
        switch (evt.props.id) {
            case SECTION_BUTTONS.CALENDAR:
                this.props.history.push("/calendar");
                break;
            case SECTION_BUTTONS.PROGRESS:
                this.props.history.push("/progress");
                break;
            case SECTION_BUTTONS.EXERCISES:
                this.props.history.push("/exercises");
                break;
            case SECTION_BUTTONS.TRAININGS:
                this.props.history.push("/trainings");
                break;
            default:
                this.props.history.push("/");
        }
    }

    _onTrackerButtonClick(selectedTraining) {
        this.props.history.push("/tracker-config", {
            selectedTraining
        });
    }

    render() {
        return (
            <div className="Main">
                <Header/>
                <Section title={"Ostatni trening"}>
                    <SectionLastTraining/>
                </Section>
                <SectionButton id={SECTION_BUTTONS.CALENDAR}
                               title={"Kalendarz"}
                               brief={"Treningów w tym tygodniu: 2"}
                               icon={SECTION_BUTTONS.CALENDAR}
                               onClick={this._onSectionClickBind}/>
                {/*<SectionButton id={SECTION_BUTTONS.PROGRESS}*/}
                {/*               title={"Moje postępy"}*/}
                {/*               brief={"2 treningi w ciągu ostatniego tygodnia"}*/}
                {/*               icon={SECTION_BUTTONS.PROGRESS}*/}
                {/*               onClick={this._onSectionClickBind}/>*/}
                <SectionButton id={SECTION_BUTTONS.EXERCISES}
                               title={"Atlas ćwiczeń"}
                               brief={`Ostatnio dodane: ${this.state.exercises}`}
                               icon={SECTION_BUTTONS.EXERCISES}
                               onClick={this._onSectionClickBind}/>
                <SectionButton id={SECTION_BUTTONS.TRAININGS}
                               title={"Baza treningów"}
                               brief={this.state.trainings}
                               icon={SECTION_BUTTONS.TRAININGS}
                               onClick={this._onSectionClickBind}/>
                <TrackerButton onClick={this._onTrackerButtonClickBind}/>
            </div>
        )
    }
}

Main.propTypes = {}

export default Main;
