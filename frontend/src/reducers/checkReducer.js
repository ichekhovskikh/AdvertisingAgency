import {
    NOTHING,
    GET_ALL_CHECKS,
    GET_CHECK,
    ADD_CHECK,
    UPDATE_CHECK,
    DELETE_CHECK, TRY_LOGIN
} from "../actions/types";
import {hasCode, isCheckAction, requiredLogin} from "./reducerUtils";
import {AuthenticationService} from "../service/AuthenticationService";

const initialState = {
    checks: [],
    check: {},
    deprecated: NOTHING
};

export default function (state = initialState, action) {
    if (hasCode(action) && isCheckAction(action) && requiredLogin(action)) {
        AuthenticationService.logout();
        return {...state, deprecated: TRY_LOGIN};
    } else if (hasCode(action) && isCheckAction(action) && action.payload.code !== 200) {
        alert(action.payload.message);
        return state;
    } else {
        switch (action.type) {
            case GET_ALL_CHECKS:
                return {
                    ...state,
                    checks: action.payload.data,
                    deprecated: NOTHING
                };
            case GET_CHECK:
                return {
                    ...state,
                    check: action.payload.data,
                    deprecated: NOTHING
                };
            case ADD_CHECK:
            case UPDATE_CHECK:
            case DELETE_CHECK:
                return {
                    ...state,
                    deprecated: GET_ALL_CHECKS
                };
            default:
                return state;
        }
    }
}