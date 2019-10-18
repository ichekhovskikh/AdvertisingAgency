import axios from "axios";
import {
    GET_ALL_SELLERS,
    GET_SELLER,
    ADD_SELLER,
    UPDATE_SELLER,
    DELETE_SELLER,
    API_URL
} from "./types";
import {AuthenticationService} from "../service/AuthenticationService";
import {getParams} from "./actionUtils";

export const getAllSellers = (search, sort) => async dispatch => {
    axios.get(`${API_URL}/seller/all${getParams(search, sort)}`, {
        headers: {authorization: `Basic ${AuthenticationService.getToken()}`}
    }).then(response => {
        dispatch({
            type: GET_ALL_SELLERS,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: GET_ALL_SELLERS,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};

export const getSeller = seller_id => async dispatch => {
    axios.get(`${API_URL}/seller?id=${seller_id}`, {
        headers: {authorization: `Basic ${AuthenticationService.getToken()}`}
    }).then(response => {
        dispatch({
            type: GET_SELLER,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: GET_SELLER,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};

export const addSeller = seller => async dispatch => {
    axios.post(`${API_URL}/seller/add`,
        {data: seller},
        {headers: {authorization: `Basic ${AuthenticationService.getToken()}`}}
    ).then(response => {
        dispatch({
            type: ADD_SELLER,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: ADD_SELLER,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};

export const updateSeller = seller => async dispatch => {
    axios.post(`${API_URL}/seller/update`,
        {data: seller},
        {headers: {authorization: `Basic ${AuthenticationService.getToken()}`}}
    ).then(response => {
        dispatch({
            type: UPDATE_SELLER,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: UPDATE_SELLER,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};

export const removeSeller = seller_id => async dispatch => {
    axios.get(`http://localhost:8080/seller/remove?id=${seller_id}`, {
        headers: {authorization: `Basic ${AuthenticationService.getToken()}`}
    }).then(response => {
        dispatch({
            type: DELETE_SELLER,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: DELETE_SELLER,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};
