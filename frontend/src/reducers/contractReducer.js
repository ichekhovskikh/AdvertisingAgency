import {
    NOTHING,
    GET_ALL_CONTRACTS,
    GET_CONTRACT,
    ADD_CONTRACT,
    UPDATE_CONTRACT,
    DELETE_CONTRACT, TRY_LOGIN
} from "../actions/types";
import {hasCode, isContractAction, requiredLogin} from "./reducerUtils";
import {AuthenticationService} from "../service/AuthenticationService";

const initialState = {
    contracts: [],
    contract: {},
    deprecated: NOTHING
};

export default function (state = initialState, action) {
    if (hasCode(action) && isContractAction(action) && requiredLogin(action)) {
        AuthenticationService.logout();
        return {...state, deprecated: TRY_LOGIN};
    } else if (hasCode(action) && isContractAction(action) && action.payload.code !== 200) {
        alert(action.payload.message);
        return state;
    } else {
        switch (action.type) {
            case GET_ALL_CONTRACTS:
                return {
                    ...state,
                    contracts: action.payload.data,
                    deprecated: NOTHING
                };
            case GET_CONTRACT:
                return {
                    ...state,
                    contract: action.payload.data,
                    deprecated: NOTHING
                };
            case ADD_CONTRACT:
            case UPDATE_CONTRACT:
            case DELETE_CONTRACT:
                return {
                    ...state,
                    deprecated: GET_ALL_CONTRACTS
                };
            default:
                return state;
        }
    }
}