import React from 'react'
import { View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import DeckView from './components/DeckView'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'

const DeckStack = createStackNavigator({
  DeckList: DeckList,
  DeckView: DeckView,
  AddCard: AddCard,
  Quiz: Quiz,
})

const MainNavigator = createAppContainer(createBottomTabNavigator({
  DeckList: DeckStack,
  NewDeck: NewDeck,
}))

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={{flex: 1}}>
        <View style={{height: 20}}/>
        <MainNavigator />
      </View>
    </Provider>
  )
}
