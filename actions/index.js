import { getDecks } from '../utlis/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const GET_DECK = 'GET_DECK'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export function receiveDecks () {
    return (dispatch) => {
        getDecks()
            .then((decks) => 
            dispatch({
            type: RECEIVE_DECKS,
            decks
        }))
    }
}

export function getDeck (title) {
    return {
        type: GET_DECK,
        title
    }
}

export function addDeck (title) {
    return {
        type: ADD_DECK,
        title
    }
}

export function addCard (title, card) {
    return {
        type: ADD_CARD,
        title,
        card
    }
}