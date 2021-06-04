import React from 'react';
import './Navigation.scss';
import { FaBars } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { FaSignOutAlt } from "react-icons/fa";
import { FaWrench } from "react-icons/fa";

import classnames from "classnames";
import {connect} from "react-redux";
import {logoutUserAction} from "../../../store/actions/authActions";
import PropTypes from "prop-types";

class Navigation extends React.Component {

    constructor(props) {
        super(props);

        this._onLogoutClickBind = this._onLogoutClick.bind(this);
        this._toggleBind = this._toggle.bind(this);

        this.state = {
            shouldBeVisible: false
        }
    }

    _toggle() {
        this.setState({ shouldBeVisible: !this.state.shouldBeVisible});
    }

    _onLogoutClick = e => {
        this.props.logoutUserAction();
    };

    // todo: animation for nav, bigger close btn, action buttons, maybe avatar instead of bars
    render() {
        return (
            <div className="Navigation">
                <div className={"Navigation__trigger"} onClick={this._toggleBind}>
                    <FaBars/>
                </div>
                <div className={classnames(
                    "Navigation__items",
                    {"Navigation__items--visible": this.state.shouldBeVisible}
                )}>
                    <div className={"Navigation__header"}>
                        <div className={"Navigation__close-button"} onClick={this._toggleBind}>
                            <CgClose/>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <div className={"Navigation__item-icon"}>
                                <FaWrench/>
                            </div>
                            <div className={"Navigation__item-label"}>
                                Ustawienia
                            </div>
                        </li>
                        <li onClick={this._onLogoutClickBind}>
                            <div className={"Navigation__item-icon"}>
                                <FaSignOutAlt/>
                            </div>
                            <div className={"Navigation__item-label"}>
                                Wyloguj
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}


Navigation.propTypes = {
    logoutUserAction: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUserAction }
)(Navigation);
