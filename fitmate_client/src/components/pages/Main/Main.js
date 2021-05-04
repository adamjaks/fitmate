import React from 'react';
import './Main.scss';
import Section from "../../sections/Section/Section";
import SectionButton from "../../sections/SectionButton/SectionButton";
import SectionLastTraining from "../../sections/Section/SectionLastTraining/SectionLastTraining";
import Header from "../../sections/Header/Header";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUserAction } from "../../../store/actions/authActions";

class Main extends React.Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUserAction();
    };

    render() {
        // const { user } = this.props.auth;

        return (
            <div className="Main">
                <Header></Header>
                <Section title={"Mój ostatni trening"}>
                    <SectionLastTraining/>
                </Section>
                <SectionButton title={"Kalendarz"}/>
                <SectionButton title={"Moje postępy"}/>
                <SectionButton title={"Moje treningi"}/>
                <button onClick={this.onLogoutClick.bind(this)}>Wyloguj</button>
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
