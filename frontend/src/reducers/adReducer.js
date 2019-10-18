import {
    NOTHING,
    GET_ALL_ADS,
    GET_AD,
    ADD_AD,
    UPDATE_AD,
    DELETE_AD,
    TRY_LOGIN
} from "../actions/types";
import {hasCode, isAdAction, requiredLogin} from "./reducerUtils";
import {AuthenticationService} from "../service/AuthenticationService";

const initialState = {
    ads: [],
    ad: {},
    deprecated: NOTHING
};

export default function (state = initialState, action) {
    if (hasCode(action) && isAdAction(action) && requiredLogin(action)) {
        AuthenticationService.logout();
        return {...state, deprecated: TRY_LOGIN};
    } else if (hasCode(action) && isAdAction(action) && action.payload.code !== 200) {
        alert(action.payload.message);
        return state;
    } else {
        switch (action.type) {
            case GET_ALL_ADS:
                return {
                    ...state,
                    ads: action.payload.data,
                    deprecated: NOTHING
                };
            case GET_AD:
                return {
                    ...state,
                    ad: action.payload.data,
                    deprecated: NOTHING
                };
            case ADD_AD:
            case UPDATE_AD:
            case DELETE_AD:
                return {
                    ...state,
                    deprecated: GET_ALL_ADS
                };
            default:
                return state;
        }
    }
}