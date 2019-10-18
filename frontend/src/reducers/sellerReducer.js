import {
    NOTHING,
    GET_ALL_SELLERS,
    GET_SELLER,
    ADD_SELLER,
    UPDATE_SELLER,
    DELETE_SELLER, TRY_LOGIN
} from "../actions/types";
import {hasCode, isSellerAction, requiredLogin} from "./reducerUtils";
import {AuthenticationService} from "../service/AuthenticationService";

const initialState = {
    sellers: [],
    seller: {},
    deprecated: NOTHING
};

export default function (state = initialState, action) {
    if (hasCode(action) && isSellerAction(action) && requiredLogin(action)) {
        AuthenticationService.logout();
        return {...state, deprecated: TRY_LOGIN};
    } else if (hasCode(action) && isSellerAction(action) && action.payload.code !== 200) {
        alert(action.payload.message);
        return state;
    } else {
        switch (action.type) {
            case GET_ALL_SELLERS:
                return {
                    ...state,
                    sellers: action.payload.data,
                    deprecated: NOTHING
                };
            case GET_SELLER:
                return {
                    ...state,
                    seller: action.payload.data,
                    deprecated: NOTHING
                };
            case ADD_SELLER:
            case UPDATE_SELLER:
            case DELETE_SELLER:
                return {
                    ...state,
                    deprecated: GET_ALL_SELLERS
                };
            default:
                return {
                    ...state,
                    deprecated: NOTHING
                };
        }
    }
}