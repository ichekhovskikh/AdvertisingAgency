import axios from "axios";
import {
    GET_ALL_PASSPORTS,
    GET_PASSPORT,
    ADD_PASSPORT,
    UPDATE_PASSPORT,
    DELETE_PASSPORT,
    API_URL
} from "./types";
import {AuthenticationService} from "../service/AuthenticationService";
import {getParams} from "./actionUtils";

export const getAllPassports = (search, sort) => async dispatch => {
    axios.get(`${API_URL}/passport/all${getParams(search, sort)}`, {
        headers: {authorization: `Basic ${AuthenticationService.getToken()}`}
    }).then(response => {
        dispatch({
            type: GET_ALL_PASSPORTS,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: GET_ALL_PASSPORTS,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};

export const getPassport = passport_id => async dispatch => {
    axios.get(`${API_URL}/passport?id=${passport_id}`, {
        headers: {authorization: `Basic ${AuthenticationService.getToken()}`}
    }).then(response => {
        dispatch({
            type: GET_PASSPORT,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: GET_PASSPORT,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};

export const addPassport = passport => async dispatch => {
    axios.post(`${API_URL}/passport/add`,
        {data: passport},
        {headers: {authorization: `Basic ${AuthenticationService.getToken()}`}}
    ).then(response => {
        dispatch({
            type: ADD_PASSPORT,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: ADD_PASSPORT,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};

export const updatePassport = passport => async dispatch => {
    axios.post(`${API_URL}/passport/update`,
        {data: passport},
        {headers: {authorization: `Basic ${AuthenticationService.getToken()}`}}
    ).then(response => {
        dispatch({
            type: UPDATE_PASSPORT,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: UPDATE_PASSPORT,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};

export const removePassport = passport_id => async dispatch => {
    axios.get(`${API_URL}/passport/remove?id=${passport_id}`, {
        headers: {authorization: `Basic ${AuthenticationService.getToken()}`}
    }).then(response => {
        dispatch({
            type: DELETE_PASSPORT,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: DELETE_PASSPORT,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};
