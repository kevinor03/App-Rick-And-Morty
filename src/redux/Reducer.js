import { ADD_TO_FAVORITES, REMOVE_FAVORITE } from "./Action-types";

let firstState = {characters:[], favorites:[]}

export default function rootReducer (state = firstState, action) {
    switch(action.type){
        case ADD_TO_FAVORITES:
            return {
                ...state,
                favorites: [...state.favorites,action.payload]
            }
        case REMOVE_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.filter(characters => characters.id !== Number(action.payload))
            }
        default:
        return state;
    }
}