import React from 'react';
import './ButtonControl.scss';

class ButtonControl extends React.Component {
    constructor(props) {
        super(props)
        this._onClickBind = this._onClick.bind(this);
    }

    _onClick() {
        if (this.props.onClick) {
            this.props.onClick(this);
        }
    }

    render() {
        return (
            <button className={`ButtonControl ButtonControl--${this.props.type || "primary"}`} onClick={this._onClickBind}>
                { !this.props.loader && this.props.value }
                { this.props.loader &&
                    <div className={"ButtonControl__loader"} />
                }
            </button>
        )
    }
}

export default ButtonControl;
