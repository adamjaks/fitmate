import {
    SET_CURRENT_USER_ACTION,
    USER_LOADING_ACTION
} from "../actions/actionTypes";

const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
};

function defaultAuthReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER_ACTION:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case USER_LOADING_ACTION:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}

export default defaultAuthReducer;
