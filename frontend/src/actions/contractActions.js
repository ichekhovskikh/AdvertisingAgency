import axios from "axios";
import {
    GET_ALL_CONTRACTS,
    GET_CONTRACT,
    ADD_CONTRACT,
    UPDATE_CONTRACT,
    DELETE_CONTRACT,
    API_URL
} from "./types";
import {AuthenticationService} from "../service/AuthenticationService";
import {getParams} from "./actionUtils";

export const getAllContracts = (search, sort) => async dispatch => {
    axios.get(`${API_URL}/contract/all${getParams(search, sort)}`, {
        headers: {authorization: `Basic ${AuthenticationService.getToken()}`}
    }).then(response => {
        dispatch({
            type: GET_ALL_CONTRACTS,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: GET_ALL_CONTRACTS,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};

export const getContract = contract_id => async dispatch => {
    axios.get(`${API_URL}/contract?id=${contract_id}`, {
        headers: {authorization: `Basic ${AuthenticationService.getToken()}`}
    }).then(response => {
        dispatch({
            type: GET_CONTRACT,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: GET_CONTRACT,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};

export const addContract = contract => async dispatch => {
    axios.post(`${API_URL}/contract/add`,
        {data: contract},
        {headers: {authorization: `Basic ${AuthenticationService.getToken()}`}}
    ).then(response => {
        dispatch({
            type: ADD_CONTRACT,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: ADD_CONTRACT,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};

export const updateContract = contract => async dispatch => {
    axios.post(`${API_URL}/contract/update`,
        {data: contract},
        {headers: {authorization: `Basic ${AuthenticationService.getToken()}`}}
    ).then(response => {
        dispatch({
            type: UPDATE_CONTRACT,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: UPDATE_CONTRACT,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};

export const removeContract = contract_id => async dispatch => {
    axios.get(`${API_URL}/contract/remove?id=${contract_id}`, {
        headers: {authorization: `Basic ${AuthenticationService.getToken()}`}
    }).then(response => {
        dispatch({
            type: DELETE_CONTRACT,
            payload: response.data
        });
    }).catch(error => {
        dispatch({
            type: DELETE_CONTRACT,
            payload: {
                code: 302,
                message: 'login'
            }
        });
    });
};
