import React from 'react';
import './ListControl.scss';
import classnames from "classnames";
import SelectControl from "../SelectControl/SelectControl";
import { FaCheck } from "react-icons/fa";

class ListControl extends React.Component {
    constructor(props) {
        super(props)

        this._onClickBind = this._onClick.bind(this);
        this._onSearchSelectChangeBind = this._onSearchSelectChange.bind(this);
        this._onItemStateChangedBind = this._onItemStateChanged.bind(this);

        this.state = {
            pickedItemsValues: []
        }
    }

    _onClick() {
        // if (this.props.onClick) {
        //     this.props.onClick(this);
        // }
    }

    _onSearchSelectChange(evt) {
        this.props.onSort(evt.target.value);
    }

    _onItemStateChanged(evt) {
        const itemId = evt.target.getAttribute("id");
        let newPickedItemsValues = [...this.state.pickedItemsValues];

        if (evt.target.checked) {
            newPickedItemsValues = [...newPickedItemsValues, itemId]
        } else {
            const itemIndex = newPickedItemsValues.indexOf(itemId);
            newPickedItemsValues.splice(itemIndex, 1);
        }

        this.setState({pickedItemsValues: newPickedItemsValues});
        this.props.onItemStateChanged(newPickedItemsValues);
    }

    _isChecked(itemId) {
        return this.state.pickedItemsValues.includes(itemId)
    }

    render() {
        return (
            <div className={"ListControl"}>
                {/*<InputControl*/}
                {/*    type={"search"}*/}
                {/*    className={*/}
                {/*        classnames("ListControl__input", {*/}
                {/*            "ListControl__input--visible": this.props.sortable*/}
                {/*        })*/}
                {/*    }*/}
                {/*    placeholder={"Wyszukaj"}*/}
                {/*/>*/}
                <div className={
                    classnames("ListControl__select", { "ListControl__select--visible": this.props.searchable }) }>
                    <SelectControl
                        type={"search"}
                        options={this.props.searchableItems}
                        onChange={this._onSearchSelectChangeBind}/>
                </div>

                { this.props.items.map((item, i) => {
                    return (
                        <label className={"ListControl__item"} key={i}>
                            <div className={"ListControl__item-checkbox"}>
                                <input type={"checkbox"} id={ item.value } onChange={this._onItemStateChangedBind}/>
                                <div className={classnames(
                                    "ListControl__item-checkbox-item",
                                        {"ListControl__item-checkbox-item--checked": this._isChecked(item.value)}
                                    )}>
                                    <FaCheck className={"ListControl__item-checkbox-icon"}/>
                                </div>
                            </div>
                            <div className={"ListControl__item-label"}>
                                { item.name }
                            </div>
                        </label>
                    )
                })}
            </div>
        )
    }
}


ListControl.propTypes = {};

ListControl.defaultProps = {
    sortable: false,
};

export default ListControl;
