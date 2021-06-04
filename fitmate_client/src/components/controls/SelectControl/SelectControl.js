import React from 'react';
import './SelectControl.scss';
import { FaChevronDown } from "react-icons/fa";

class SelectControl extends React.Component {
    render() {
        return (
            <div className={"SelectControl"}>
                <select className={"SelectControl__select"}
                        placeholder={this.props.placeholder}
                        multiple={this.props.multiple}
                        onChange={this.props.onChange}>
                    {
                        this.props.options.map((option, index) => {
                            return <option
                                value={option.value}
                                key={ index }>
                                { option.name }
                            </option>
                        })
                    }
                </select>
                <div className={"SelectControl__icon"}>
                    <FaChevronDown/>
                </div>
            </div>
        )
    }
}

SelectControl.propTypes = {};

SelectControl.defaultProps = {
    multiple: false
};

export default SelectControl;
