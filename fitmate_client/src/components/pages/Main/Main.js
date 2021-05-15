import React from 'react';
import './Main.scss';
import Section from "../../sections/Section/Section";
import SectionButton from "../../sections/SectionButton/SectionButton";
import SectionLastTraining from "../../sections/Section/SectionLastTraining/SectionLastTraining";
import Header from "../../sections/Header/Header";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUserAction } from "../../../store/actions/authActions";

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
    }

    _onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUserAction();
    };

    _onSectionClick(evt) {
        switch (evt.props.id) {
            case SECTION_BUTTONS.CALENDAR: this.props.history.push("/calendar"); break;
            case SECTION_BUTTONS.PROGRESS: this.props.history.push("/progress"); break;
            case SECTION_BUTTONS.EXERCISES: this.props.history.push("/exercises"); break;
            case SECTION_BUTTONS.TRAININGS: this.props.history.push("/trainings"); break;
            default: this.props.history.push("/");
        }
    }

    render() {
        // const { user } = this.props.auth;

        return (
            <div className="Main">
                <Header/>
                <Section title={"Mój ostatni trening"}>
                    <SectionLastTraining/>
                </Section>
                <SectionButton id={SECTION_BUTTONS.CALENDAR}
                               title={"Kalendarz"}
                               brief={"Ostatni trening: 23/04/2021"}
                               icon={SECTION_BUTTONS.CALENDAR}
                               onClick={this._onSectionClickBind}/>
                <SectionButton id={SECTION_BUTTONS.PROGRESS}
                               title={"Moje postępy"}
                               brief={"75kg, wzrost wagi: 11%"}
                               icon={SECTION_BUTTONS.PROGRESS}
                               onClick={this._onSectionClickBind}/>
                <SectionButton id={SECTION_BUTTONS.EXERCISES}
                               title={"Baza ćwiczeń"}
                               brief={"Ostatnio dodane: wykroki"}
                               icon={SECTION_BUTTONS.EXERCISES}
                               onClick={this._onSectionClickBind}/>
                <SectionButton id={SECTION_BUTTONS.TRAININGS}
                               title={"Moje treningi"}
                               brief={"Trening A,Trening B, FBW"}
                               icon={SECTION_BUTTONS.TRAININGS}
                               onClick={this._onSectionClickBind}/>
                <button onClick={this._onLogoutClickBind}>Wyloguj</button>
            </div>
        )
    }
}

Main.propTypes = {
    logoutUserAction: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUserAction }
)(Main);
