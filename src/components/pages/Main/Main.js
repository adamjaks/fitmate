import React from 'react';
import './Main.scss';
import Section from "../../sections/Section/Section";
import SectionButton from "../../sections/SectionButton/SectionButton";
import SectionLastTraining from "../../sections/Section/SectionLastTraining/SectionLastTraining";
import Header from "../../sections/Header/Header";
import TrackerButton from "../../sections/TrackerButton/TrackerButton";
import {Link} from "react-router-dom";

const SECTION_BUTTONS = {
    CALENDAR: "calendar",
    PROGRESS: "progress",
    EXERCISES: "exercises",
    TRAININGS: "trainings",
}

class Main extends React.Component {

    constructor(props) {
        super(props);

        this._onSectionClickBind = this._onSectionClick.bind(this);
        this._onLogoutClickBind = this._onLogoutClick.bind(this);
        this._onTrackerButtonClickBind = this._onTrackerButtonClick.bind(this);
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
                               brief={"Ostatni trening: 23/04/2021"}
                               icon={SECTION_BUTTONS.CALENDAR}
                               onClick={this._onSectionClickBind}/>
                <SectionButton id={SECTION_BUTTONS.PROGRESS}
                               title={"Moje postępy"}
                               brief={"2 treningi w ciągu ostatniego tygodnia"}
                               icon={SECTION_BUTTONS.PROGRESS}
                               onClick={this._onSectionClickBind}/>
                <SectionButton id={SECTION_BUTTONS.EXERCISES}
                               title={"Atlas ćwiczeń"}
                               brief={"Ostatnio dodane: wykroki"}
                               icon={SECTION_BUTTONS.EXERCISES}
                               onClick={this._onSectionClickBind}/>
                <SectionButton id={SECTION_BUTTONS.TRAININGS}
                               title={"Baza treningów"}
                               brief={"Trening A,Trening B, FBW"}
                               icon={SECTION_BUTTONS.TRAININGS}
                               onClick={this._onSectionClickBind}/>
                <TrackerButton onClick={this._onTrackerButtonClickBind}/>
            </div>
        )
    }
}

Main.propTypes = {}

export default Main;
