import React from 'react';
import './TextareaControl.scss';

class TextareaControl extends React.Component {

    render() {
        return (
            <div className={"TextareaControl"}>
                <textarea className={"TextareaControl__textarea"}
                       placeholder={this.props.placeholder}
                       onChange={this.props.onChange}
                       value={this.props.value}
                       id={this.props.id}>
                </textarea>
            </div>
        )
    }
}

TextareaControl.propTypes = {};

export default TextareaControl;
