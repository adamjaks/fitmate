import React from 'react';
import './MultipleChoiceControl.scss';
import { FaCheck } from "react-icons/fa";
import classnames from "classnames";

class MultipleChoiceControl extends React.Component {

    constructor(props) {
        super(props);

        this._onItemClickBind = this._onItemClick.bind(this);

        this.state = {
            items: []
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState((state, props) => {
            const propsItems = props.items.map(item => ({...item, active: false}));
            return { items: propsItems };
        });
    }

    _onItemClick(evt) {
        const itemsEdited = this.state.items.map(item => {
            if (item.value === evt.currentTarget.getAttribute("data-value")) item.active = !item.active;
            return item;
        });
        this.setState({items: itemsEdited});
        this.props.onItemsChange(itemsEdited);
    }

    render() {
        return (
            <div className={"MultipleChoiceControl"}>
                {
                    this.state.items.map((item, i) => {
                        return <div className={classnames("MultipleChoiceControl__item",
                            {"MultipleChoiceControl__item--active": item.active})}
                                    key={ i }
                                    data-value={ item.value }
                                    onClick={ this._onItemClickBind }>
                            <div className={"MultipleChoiceControl__item-icon"}>
                                <FaCheck/>
                            </div>
                            <div className={"MultipleChoiceControl__item-label"}>
                                { item.name }
                            </div>
                        </div>
                    })
                }
            </div>
        )
    }
}

MultipleChoiceControl.propTypes = {
    // items: arrayOf(object |)
};

export default MultipleChoiceControl;