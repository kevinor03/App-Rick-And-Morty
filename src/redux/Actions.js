import { ADD_TO_FAVORITES, REMOVE_FAVORITE, ORDER, FILTER, RESET } from "./Action-types";

export function addFavorite(character) {
    return {
        type: ADD_TO_FAVORITES,
        payload: character,
    }
}

export function removeFavorite(id) {
    return {
        type: REMOVE_FAVORITE,
        payload: id,
    }
}

export function orderFavorite(order) {
    return {
        type: ORDER,
        payload: order,
    }
}

export function filterFavorite(gender) {
    return {
        type: FILTER,
        payload: gender,
    }
}

export function resetFavorite() {
    return {
        type: RESET
    }
}