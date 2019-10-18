import axios from "axios";
import {
    GET_ALL_CHECKS,
    GET_CHECK,
    ADD_CHECK,
    UPDATE_CHECK,
    DELETE_CHECK,
    API_URL
} from "./types";
import {AuthenticationService} from "../service/AuthenticationService";
import {getParams} from "./actionUtils";

export const getAllChecks = (search, sort) => async dispatch => {
    axios.get(`${API_URL}/check/all${getParams(search, sort)}`, {
        headers: {authorization: `Basic ${AuthenticationService.getToken()}`}
    }).then(response => {
        dispatch({
            type: GET_ALL_CHECKS,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: GET_ALL_CHECKS,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};

export const getCheck = check_id => async dispatch => {
    axios.get(`${API_URL}/check?id=${check_id}`, {
        headers: {authorization: `Basic ${AuthenticationService.getToken()}`}
    }).then(response => {
        dispatch({
            type: GET_CHECK,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: GET_CHECK,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};

export const addCheck = check => async dispatch => {
    axios.post(`${API_URL}/check/add`,
        {data: check},
        {headers: {authorization: `Basic ${AuthenticationService.getToken()}`}}
    ).then(response => {
        dispatch({
            type: ADD_CHECK,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: ADD_CHECK,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};

export const updateCheck = check => async dispatch => {
    axios.post(`${API_URL}/check/update`,
        {data: check},
        {headers: {authorization: `Basic ${AuthenticationService.getToken()}`}}
    ).then(response => {
        dispatch({
            type: UPDATE_CHECK,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: UPDATE_CHECK,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};

export const removeCheck = check_id => async dispatch => {
    axios.get(`${API_URL}/check/remove?id=${check_id}`, {
        headers: {authorization: `Basic ${AuthenticationService.getToken()}`}
    }).then(response => {
        dispatch({
            type: DELETE_CHECK,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: DELETE_CHECK,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};
