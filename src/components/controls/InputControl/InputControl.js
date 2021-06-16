import React from 'react';
import './InputControl.scss';
import { FaSearch } from 'react-icons/fa';
import classnames from "classnames";

const INPUT_TYPES = {
    SEARCH: "search"
};

class InputControl extends React.Component {

    componentDidMount() {
        this._getIcon();
    }

    _shouldIconBeVisible() {
        return this.props.type === INPUT_TYPES.SEARCH;
    }

    _getIcon() {
        switch (this.props.type) {
            case INPUT_TYPES.SEARCH: return <FaSearch/>;
            default: return null;
        }
    }

    render() {
        return (
            <div className={"InputControl"}>
                <input className={`InputControl__input InputControl__input--${this.props.mode}`}
                       type={this.props.type}
                       placeholder={this.props.placeholder}
                       onChange={this.props.onChange}
                       value={this.props.value}
                       id={this.props.id}>
                </input>
                <div className={classnames(
                        "InputControl__icon",
                            {"InputControl__icon--visible": this._shouldIconBeVisible()}
                    )}>
                    { this._getIcon() }
                </div>
            </div>

        )
    }
}

InputControl.propTypes = {};

InputControl.defaultProps = {
    type: "text"
};

export default InputControl;
