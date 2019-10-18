import axios from "axios";
import {API_URL, LOGOUT, REGISTER, TRY_LOGIN} from "./types";
import {AuthenticationService} from "../service/AuthenticationService";

export const tryLogin = (form) => async dispatch => {
    const response = await axios({
        method: 'post',
        url: `${API_URL}/login`,
        data: new URLSearchParams(form),
        headers: {'content-type': 'application/x-www-form-urlencoded'},
    });
    dispatch({
        type: TRY_LOGIN,
        payload: {
            response: response.data,
            login: form.get("login"),
            password: form.get("password")
        }
    });
};

export const registration = (login, password) => async dispatch => {
    const response = await axios.post(`${API_URL}/register`, {
            data: {
                login: login,
                password: password
            }
        }
    );
    dispatch({
        type: REGISTER,
        payload: {
            response: response.data,
            login: login,
            password: password
        }
    });
};

export const logout = () => async dispatch => {
    const response = await axios.get(`${API_URL}/logout`, {
        headers: {authorization: `Basic ${AuthenticationService.getToken()}`}
    });
    dispatch({
        type: LOGOUT,
        payload: response.data
    });
};