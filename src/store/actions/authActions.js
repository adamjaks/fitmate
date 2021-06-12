import axios from "axios";
import setAuthToken from "../../components/utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
    GET_ERRORS_ACTION,
    SET_CURRENT_USER_ACTION,
    USER_LOADING_ACTION
} from "./actionTypes";

export const registerUserAction = (userDataPayload, history) => dispatch => {
    axios
        .post("/api/users/register", userDataPayload)
        .then(res => history.push("/login"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS_ACTION,
                payload: err.response.data
            })
        );
};

export const loginUserAction = userDataPayload => dispatch => {
    axios
        .post("https://fitmate-server.herokuapp.com/api/users/login", userDataPayload)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);

            const decoded = jwt_decode(token);
            dispatch(setCurrentUserAction(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS_ACTION,
                payload: err.response.data
            })
        );
};

export const setCurrentUserAction = decoded => {
    return {
        type: SET_CURRENT_USER_ACTION,
        payload: decoded
    };
};

export const setUserLoadingAction = () => {
    return {
        type: USER_LOADING_ACTION
    };
};

export const logoutUserAction = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUserAction({}));
};