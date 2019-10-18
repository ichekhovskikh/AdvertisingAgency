import axios from "axios";
import {
    GET_ALL_ADVERTISERS,
    GET_ADVERTISER,
    ADD_ADVERTISER,
    UPDATE_ADVERTISER,
    DELETE_ADVERTISER,
    API_URL
} from "./types";
import {AuthenticationService} from "../service/AuthenticationService";
import {getParams} from "./actionUtils";

export const getAllAdvertisers = (search, sort) => async dispatch => {
    axios.get(`${API_URL}/advertiser/all${getParams(search, sort)}`, {
        headers: {authorization: `Basic ${AuthenticationService.getToken()}`}
    }).then(response => {
        dispatch({
            type: GET_ALL_ADVERTISERS,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: GET_ALL_ADVERTISERS,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};

export const getAdvertiser = advertiser_id => async dispatch => {
    axios.get(`${API_URL}/advertiser?id=${advertiser_id}`, {
        headers: {authorization: `Basic ${AuthenticationService.getToken()}`}
    }).then(response => {
        dispatch({
            type: GET_ADVERTISER,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: GET_ADVERTISER,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};

export const addAdvertiser = advertiser => async dispatch => {
    axios.post(`${API_URL}/advertiser/add`,
        {data: advertiser},
        {headers: {authorization: `Basic ${AuthenticationService.getToken()}`}}
    ).then(response => {
        dispatch({
            type: ADD_ADVERTISER,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: ADD_ADVERTISER,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};

export const updateAdvertiser = advertiser => async dispatch => {
    axios.post(`${API_URL}/advertiser/update`,
        {data: advertiser},
        {headers: {authorization: `Basic ${AuthenticationService.getToken()}`}}
    ).then(response => {
        dispatch({
            type: UPDATE_ADVERTISER,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: UPDATE_ADVERTISER,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};

export const removeAdvertiser = advertiser_id => async dispatch => {
    axios.get(`${API_URL}/advertiser/remove?id=${advertiser_id}`, {
        headers: {authorization: `Basic ${AuthenticationService.getToken()}`}
    }).then(response => {
        dispatch({
            type: DELETE_ADVERTISER,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: DELETE_ADVERTISER,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};
