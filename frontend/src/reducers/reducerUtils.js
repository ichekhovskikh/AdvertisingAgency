import {
    ADD_AD,
    ADD_ADVERTISER,
    ADD_CHECK,
    ADD_CONTRACT,
    ADD_PASSPORT, ADD_SELLER,
    DELETE_AD,
    DELETE_ADVERTISER,
    DELETE_CHECK,
    DELETE_CONTRACT,
    DELETE_PASSPORT, DELETE_SELLER,
    GET_AD,
    GET_ADVERTISER,
    GET_ALL_ADS,
    GET_ALL_ADVERTISERS,
    GET_ALL_CHECKS,
    GET_ALL_CONTRACTS,
    GET_ALL_PASSPORTS,
    GET_ALL_SELLERS,
    GET_CHECK,
    GET_CONTRACT,
    GET_PASSPORT, GET_SELLER,
    UPDATE_AD,
    UPDATE_ADVERTISER,
    UPDATE_CHECK,
    UPDATE_CONTRACT,
    UPDATE_PASSPORT, UPDATE_SELLER
} from "../actions/types";

export function requiredLogin(action) {
    return action.payload.code === 302 && action.payload.message === "login"
}

export function hasCode(action) {
    return action.payload !== undefined && action.payload.code !== undefined
}

export function isAdAction(action) {
    return action.type === GET_ALL_ADS
        || action.type === GET_AD
        || action.type === ADD_AD
        || action.type === UPDATE_AD
        || action.type === DELETE_AD
}

export function isAdvertiserAction(action) {
    return action.type === GET_ALL_ADVERTISERS
        || action.type === GET_ADVERTISER
        || action.type === ADD_ADVERTISER
        || action.type === UPDATE_ADVERTISER
        || action.type === DELETE_ADVERTISER
}

export function isCheckAction(action) {
    return action.type === GET_ALL_CHECKS
        || action.type === GET_CHECK
        || action.type === ADD_CHECK
        || action.type === UPDATE_CHECK
        || action.type === DELETE_CHECK
}

export function isContractAction(action) {
    return action.type === GET_ALL_CONTRACTS
        || action.type === GET_CONTRACT
        || action.type === ADD_CONTRACT
        || action.type === UPDATE_CONTRACT
        || action.type === DELETE_CONTRACT
}

export function isPassportAction(action) {
    return action.type === GET_ALL_PASSPORTS
        || action.type === GET_PASSPORT
        || action.type === ADD_PASSPORT
        || action.type === UPDATE_PASSPORT
        || action.type === DELETE_PASSPORT
}

export function isSellerAction(action) {
    return action.type === GET_ALL_SELLERS
        || action.type === GET_SELLER
        || action.type === ADD_SELLER
        || action.type === UPDATE_SELLER
        || action.type === DELETE_SELLER
}