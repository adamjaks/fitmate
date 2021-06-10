import { GET_ERRORS_ACTION } from "../actions/actionTypes";

const initialState = {};

function defaultErrorReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS_ACTION:
            return action.payload;
        default:
            return state;
    }
}

export default defaultErrorReducer;