import {
    AD_PAGE,
    ADVERTISER_PAGE, CHECK_PAGE,
    CONTRACT_PAGE, LOGIN_PAGE,
    PASSPORT_PAGE,
    SELLER_PAGE,
} from "../actions/types";

const initialState = {
    active: AD_PAGE
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_PAGE:
        case AD_PAGE:
        case CONTRACT_PAGE:
        case ADVERTISER_PAGE:
        case SELLER_PAGE:
        case CHECK_PAGE:
        case PASSPORT_PAGE:
            return {
                ...state,
                active: action.type
            };
        default:
            return state;
    }
}
