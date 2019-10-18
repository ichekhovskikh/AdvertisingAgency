import {
    NOTHING,
    GET_ALL_PASSPORTS,
    GET_PASSPORT,
    ADD_PASSPORT,
    UPDATE_PASSPORT,
    DELETE_PASSPORT, TRY_LOGIN
} from "../actions/types";
import {hasCode, isPassportAction, requiredLogin} from "./reducerUtils";
import {AuthenticationService} from "../service/AuthenticationService";

const initialState = {
    passports: [],
    passport: {},
    deprecated: NOTHING
};

export default function (state = initialState, action) {
    if (hasCode(action) && isPassportAction(action) && requiredLogin(action)) {
        AuthenticationService.logout();
        return {...state, deprecated: TRY_LOGIN};
    } else if (hasCode(action) && isPassportAction(action) && action.payload.code !== 200) {
        alert(action.payload.message);
        return state;
    } else {
        switch (action.type) {
            case GET_ALL_PASSPORTS:
                return {
                    ...state,
                    passports: action.payload.data,
                    deprecated: NOTHING
                };
            case GET_PASSPORT:
                return {
                    ...state,
                    passport: action.payload.data,
                    deprecated: NOTHING
                };
            case ADD_PASSPORT:
            case UPDATE_PASSPORT:
            case DELETE_PASSPORT:
                return {
                    ...state,
                    deprecated: GET_ALL_PASSPORTS
                };
            default:
                return state;
        }
    }
}