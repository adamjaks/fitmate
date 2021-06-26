import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import './RegisterPage.scss';
import { registerUserAction } from "../../../store/actions/authActions";

import InputControl from "../../controls/InputControl/InputControl";
import ButtonControl from "../../controls/ButtonControl/ButtonControl";

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {},
            buttonLoader: false
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

    async _onSubmit(event) {
        event.preventDefault();

        this.setState({buttonLoader: true});

        const userDataPayload = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        await this.props.registerUserAction(userDataPayload, this.props.history);
        this.setState({buttonLoader: false});
    }

    render() {
        const { errors } = this.state;

        return <div className="RegisterPage">
            <div className={"RegisterPage__content"}>
                <div className={"RegisterPage__header"}>
                    <h2 className={"title"}>FitMate</h2>
                    <h3 className={"subtitle"}>Rejestracja</h3>
                </div>
                <form className={"RegisterPage__form"} onSubmit={this._onSubmit.bind(this)}>
                    <div className={"LoginPage__alert"}>
                        { errors.name }
                    </div>
                    <InputControl placeholder={"Nazwa użytkownika"}
                                  value={this.state.name}
                                  error={errors.name}
                                  id={"name"}
                                  onChange={this._onChange.bind(this)}
                                  mode={errors.name ? "danger" : ""}
                    />
                    <div className={"LoginPage__alert"}>
                        { errors.email }
                    </div>
                    <InputControl placeholder={"Adres e-mail"}
                                  value={this.state.email}
                                  error={errors.email}
                                  id={"email"}
                                  onChange={this._onChange.bind(this)}
                                  mode={errors.email ? "danger" : ""}
                    />
                    <div className={"RegisterPage__alert"}>
                        { errors.password }
                        { errors.passwordincorrect }
                    </div>
                    <InputControl type={"password"}
                                  placeholder={"Hasło"}
                                  value={this.state.password}
                                  id={"password"}
                                  onChange={this._onChange.bind(this)}
                                  mode={errors.password || errors.passwordincorrect ? "danger" : ""}
                    />
                    <div className={"LoginPage__alert"}>
                        { errors.password2 }
                        { errors.passwordincorrect }
                    </div>
                    <InputControl type={"password"}
                                  placeholder={"Hasło ponownie"}
                                  value={this.state.password2}
                                  id={"password2"}
                                  onChange={this._onChange.bind(this)}
                                  mode={errors.password2 || errors.passwordincorrect ? "danger" : ""}
                    />
                    <ButtonControl value={"Utwórz konto"} loader={this.state.buttonLoader}/>
                </form>
                <div className={"RegisterPage__link"}>Masz już konto?
                    <Link to={"/login"}> <b>Zaloguj się</b></Link>
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
