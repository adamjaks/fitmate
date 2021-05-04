import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link, withRouter } from "react-router-dom";

import './RegisterPage.scss';
import { registerUserAction } from "../../../store/actions/authActions";

import InputControl from "../../controls/InputControl/InputControl";
import ButtonControl from "../../controls/ButtonControl/ButtonControl";

class RegisterPage extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }

    componentWillReceiveProps(nextProps, nextContent) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/");
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    _onChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    _onSubmit(event) {
        event.preventDefault();

        const userDataPayload = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUserAction(userDataPayload, this.props.history);
    }

    render() {
        const { errors } = this.state;

        return <div className="RegisterPage">
            <div className={"RegisterPage__content"}>
                <div className={"RegisterPage__header"}>
                    <h2>FitMate</h2>
                    <h3>Rejestracja</h3>
                </div>
                <form className={"RegisterPage__form"} onSubmit={this._onSubmit.bind(this)}>
                    <InputControl placeholder={"Imię i nazwisko"}
                                  value={this.state.name}
                                  error={errors.name}
                                  id={"name"}
                                  onChange={this._onChange.bind(this)}
                                  className={classnames("", {
                                      invalid: errors.name
                                  })}
                    />
                    <InputControl placeholder={"Adres e-mail"}
                                  value={this.state.email}
                                  error={errors.email}
                                  id={"email"}
                                  onChange={this._onChange.bind(this)}
                                  className={classnames("", {
                                      invalid: errors.email
                                  })}
                    />
                    <InputControl type={"password"}
                                  placeholder={"Hasło"}
                                  value={this.state.password}
                                  id={"password"}
                                  onChange={this._onChange.bind(this)}
                                  className={classnames("", {
                                      invalid: errors.password || errors.passwordincorrect
                                  })}
                    />
                    <InputControl type={"password"}
                                  placeholder={"Hasło ponownie"}
                                  value={this.state.password2}
                                  id={"password2"}
                                  onChange={this._onChange.bind(this)}
                                  className={classnames("", {
                                      invalid: errors.password2 || errors.passwordincorrect
                                  })}
                    />
                    <ButtonControl value={"Utwórz konto"}/>
                </form>
                <div>Masz już konto?
                    <Link to={"/login"}><b>Zaloguj się</b></Link>
                </div>
            </div>
        </div>
    }
}

RegisterPage.propTypes = {};

RegisterPage.defaultProps = {};

RegisterPage.propTypes = {
    registerUserAction: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUserAction }
)(withRouter(RegisterPage));
