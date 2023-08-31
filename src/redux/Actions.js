import { ADD_TO_FAVORITES, REMOVE_FAVORITE } from "./Action-types";

export function addFavorite (character) {
    return {
        type: ADD_TO_FAVORITES,
        payload: character,
    }
}

export function removeFavorite (id) {
    return {
        type: REMOVE_FAVORITE,
        payload: id,
    }
}