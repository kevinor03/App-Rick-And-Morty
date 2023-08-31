import { ADD_TO_FAVORITES, REMOVE_FAVORITE, ORDER, FILTER, RESET } from "./Action-types";

let firstState = { characters: [], favorites: [], allCharacters: [] }

export default function rootReducer (state = firstState, action) {
    switch(action.type){
        case ADD_TO_FAVORITES:
            return {
                ...state,
                favorites: [...state.favorites, action.payload],
                allCharacters: [...state.favorites, action.payload]
            }

        case REMOVE_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.filter(characters => characters.id !== Number(action.payload))
            }

        case ORDER:
            let ordenados;

            if (action.payload === 'Asc') {
                ordenados = state.favorites.sort((a, b) => a.id > b.id ? 1 : -1)
            } else {
                ordenados = state.favorites.sort((a, b) => b.id > a.id ? 1 : -1)
            }

            return {
                ...state,
                favorites: [...ordenados]
            }

        case FILTER:
            return {
                ...state,
                favorites: state.allCharacters.filter((characters) => characters.gender === action.payload)
            }

        case RESET:
            return {
                ...state,
                favorites: [...state.allCharacters]
            }

        default:
        return state;
    }
}