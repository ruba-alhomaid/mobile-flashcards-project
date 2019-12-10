import React from 'react'
import { View } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
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
import { setLocalNotification } from './utils/helpers'
import { Foundation, Entypo } from '@expo/vector-icons'
import { shinGreen } from './utils/colors'

const DeckStack = createStackNavigator({
  DeckList: DeckList,
  DeckView: DeckView,
  AddCard: AddCard,
  Quiz: Quiz,
})

const MainNavigator = createAppContainer(createBottomTabNavigator({
  DeckList: {
    screen: DeckStack,
    navigationOptions: {
      tabBarLabel: 'Deck List',
      activeTintColor: '#F8F8F8',
      inactiveTintColor: '#586589',
      style: { backgroundColor: shinGreen },
      tabBarIcon: ({ tintColor }) => <Foundation name='list' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      activeTintColor: '#F8F8F8',
      inactiveTintColor: '#586589',
      style: { backgroundColor: shinGreen },
      tabBarIcon: ({ tintColor }) => <Entypo name='add-to-list' size={30} color={tintColor} />
    },
  },
}))

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer, applyMiddleware(ReduxThunk))}>
        <View style={{flex: 1}}>
          <View style={{height: 30}}/>
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
