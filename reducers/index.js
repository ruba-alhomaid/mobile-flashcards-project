import { RECEIVE_DECKS, GET_DECK, ADD_DECK, ADD_CARD } from '../actions'

function decks ( state={}, action ) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case GET_DECK:
            return action.id
            
        case ADD_DECK:
            return {
                ...state,
                ...action.title
            }
        case ADD_CARD:
            return {
                ...state,
                [action.title]: {
                    ...state,
                    ...action.card
                }
            }
        default:
            return state
    }
}

export default decks