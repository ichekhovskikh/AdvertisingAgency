import {
    LOGOUT,
    REGISTER,
    TRY_LOGIN
} from "../actions/types";
import {AuthenticationService} from "../service/AuthenticationService";

const initialState = {
    isLoggedIn: AuthenticationService.isUserLoggedIn(),
    error: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case REGISTER:
        case TRY_LOGIN:
            if (hasCode(action) && action.payload.response.code === 200) {
                AuthenticationService.registerSuccessfulLogin(action.payload.login, action.payload.password);
                return {
                    ...state,
                    isLoggedIn: AuthenticationService.isUserLoggedIn(),
                    error: false
                };
            } else {
                AuthenticationService.logout();
                return {
                    ...state,
                    isLoggedIn: AuthenticationService.isUserLoggedIn(),
                    error: true
                };
            }
        case LOGOUT:
            AuthenticationService.logout();
            return {
                ...state,
                isLoggedIn: AuthenticationService.isUserLoggedIn()
            };
        default:
            return state;
    }
}

function hasCode(action) {
    return action.payload.response !== undefined && action.payload.response.code !== undefined
}
