import { AsyncStorage } from 'react-native'

export const FLASHCARD_STORAGE_KEY = 'MobileFlashcards:decks'

let decks = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }

export function getDecks () {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
        .then((result) => {
            if(result === null) {
                AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(decks))
                return decks
            }
            else
                return JSON.parse(result)
        })
}

export function getDeck (title) {
    return getDecks()
        .then((decks) => decks[title])
}

export function SaveDeckTitle (title) {
    const newDeck = {title, questions:[]}
    return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
        [title]: newDeck
    }))
}

export function addCardToDeck (title, card) {
    return getDecks()
        .then((decks) => {
            decks[title].questions.push(card)
            AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify(decks))
            })
}