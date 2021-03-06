import React from 'react';
import './LoginPage.scss';
import InputControl from "../../controls/InputControl/InputControl";
import ButtonControl from "../../controls/ButtonControl/ButtonControl";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUserAction } from "../../../store/actions/authActions";
import { Link } from "react-router-dom";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
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
            email: this.state.email,
            password: this.state.password
        };

        await this.props.loginUserAction(userDataPayload);
        this.setState({buttonLoader: false});
    }

    render() {
        const { errors } = this.state;

        return <div className="LoginPage">
            <div className={"LoginPage__content"}>
                <div className={"LoginPage__header"}>
                    <h2 className={"title"}>FitMate</h2>
                    <h3 className={"subtitle"}>Logowanie</h3>
                </div>
                <form className={"LoginPage__form"} onSubmit={this._onSubmit.bind(this)}>
                    <div className={"LoginPage__alert"}>
                        { errors.email }
                    </div>
                    <InputControl placeholder={"Email"}
                                  value={this.state.email}
                                  error={errors.email}
                                  id={"email"}
                                  onChange={this._onChange.bind(this)}
                                  mode={errors.email ? "danger" : ""}
                    />
                    <div className={"LoginPage__alert"}>
                        { errors.password }
                        { errors.passwordincorrect }
                    </div>
                    <InputControl type={"password"}
                                  placeholder={"Has??o"}
                                  value={this.state.password}
                                  id={"password"}
                                  onChange={this._onChange.bind(this)}
                                  mode={errors.password || errors.passwordincorrect ? "danger" : ""}
                    />
                    <ButtonControl value={"Zaloguj"} loader={this.state.buttonLoader}/>
                </form>
                <div className={"LoginPage__link"}>Nie masz konta?
                    <Link to={"/register"}><b> Zarejestruj si??</b></Link>
                </div>
            </div>
        </div>
    }
}

LoginPage.defaultProps = {};

LoginPage.propTypes = {
    loginUserAction: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUserAction })(LoginPage);
