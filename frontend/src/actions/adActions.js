import axios from "axios";
import {
    GET_ALL_ADS,
    GET_AD,
    ADD_AD,
    UPDATE_AD,
    DELETE_AD,
    API_URL
} from "./types";
import {AuthenticationService} from "../service/AuthenticationService";
import {getParams} from "./actionUtils";

export const getAllAds = (search, sort) => async dispatch => {
    axios.get(`${API_URL}/ad/all${getParams(search, sort)}`,{
        headers: {authorization: `Basic ${AuthenticationService.getToken()}`}
    }).then(response => {
        dispatch({
            type: GET_ALL_ADS,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: GET_ALL_ADS,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};

export const getAd = ad_id => async dispatch => {
    axios.get(`${API_URL}/ad?id=${ad_id}`, {
        headers: {authorization: `Basic ${AuthenticationService.getToken()}`}
    }).then(response => {
        dispatch({
            type: GET_AD,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: GET_AD,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};

export const addAd = ad => async dispatch => {
    axios.post(`${API_URL}/ad/add`,
        {data: ad},
        {headers: {authorization: `Basic ${AuthenticationService.getToken()}`}}
    ).then(response => {
        dispatch({
            type: ADD_AD,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: ADD_AD,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};

export const updateAd = ad => async dispatch => {
    axios.post(`${API_URL}/ad/update`,
        {data: ad},
        {headers: {authorization: `Basic ${AuthenticationService.getToken()}`}}
    ).then(response => {
        dispatch({
            type: UPDATE_AD,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: UPDATE_AD,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};

export const removeAd = ad_id => async dispatch => {
    axios.get(`${API_URL}/ad/remove?id=${ad_id}`, {
        headers: {authorization: `Basic ${AuthenticationService.getToken()}`}
    }).then(response => {
        dispatch({
            type: DELETE_AD,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: DELETE_AD,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};
