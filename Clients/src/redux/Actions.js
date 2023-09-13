import { ADD_FAVORITES, REMOVE_FAVORITE, ORDER, FILTER, RESET } from "./Action-types";
import axios from "axios";

export const addFavorite = (character) => {
    const endpoint = 'http://localhost:3001/rickandmorty/fav';
    return async (dispatch) => {
        try {
            const { data } = await axios.post(endpoint, character)
            return dispatch({
                type: ADD_FAVORITES,
                payload: data,
            });
        } catch (error) {
            console.log(error)
        }
    };
};

export const removeFavorite = (id) => {
    const endpoint = 'http://localhost:3001/rickandmorty/fav/' + id;
    return async (dispatch) => {
        try {
            const { data } = await axios.delete(endpoint)
            return dispatch({
                type: REMOVE_FAVORITE,
                payload: data,
            });
        } catch (error) {
            console.log(error)
        }
    };
};

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