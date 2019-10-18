import {
    NOTHING,
    GET_ALL_ADVERTISERS,
    GET_ADVERTISER,
    ADD_ADVERTISER,
    UPDATE_ADVERTISER,
    DELETE_ADVERTISER, TRY_LOGIN
} from "../actions/types";
import {hasCode, isAdvertiserAction, requiredLogin} from "./reducerUtils";
import {AuthenticationService} from "../service/AuthenticationService";

const initialState = {
    advertisers: [],
    advertiser: {},
    deprecated: NOTHING
};

export default function (state = initialState, action) {
    if (hasCode(action) && isAdvertiserAction(action) && requiredLogin(action)) {
        AuthenticationService.logout();
        return {...state, deprecated: TRY_LOGIN};
    } else if (hasCode(action) && isAdvertiserAction(action) && action.payload.code !== 200) {
        alert(action.payload.message);
        return state;
    } else {
        switch (action.type) {
            case GET_ALL_ADVERTISERS:
                return {
                    ...state,
                    advertisers: action.payload.data,
                    deprecated: NOTHING
                };
            case GET_ADVERTISER:
                return {
                    ...state,
                    advertiser: action.payload.data,
                    deprecated: NOTHING
                };
            case ADD_ADVERTISER:
            case UPDATE_ADVERTISER:
            case DELETE_ADVERTISER:
                return {
                    ...state,
                    deprecated: GET_ALL_ADVERTISERS
                };
            default:
                return state;
        }
    }
}