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
            <button className={`ButtonControl ButtonControl--${this.props.type}`} onClick={this._onClickBind}>
                { this.props.value }
            </button>
        )
    }
}


ButtonControl.propTypes = {};

ButtonControl.defaultProps = {
    type: "primary",
};

export default ButtonControl;
