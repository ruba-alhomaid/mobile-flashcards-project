import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { receiveDecks } from '../actions/index'
import { AppLoading } from 'expo'
import Deck from './Deck'

class DeckList extends Component {
    state = {
        ready: false
      }

    componentDidMount() {
        const { dispatch } = this.props
        
        dispatch(receiveDecks())
        .then(() => this.setState(() => ({ready: true})))
        console.log('hi')
    }

    render() {
        const { decks } = this.props.decks
        const { ready } = this.state

        if ( ready === false ) {
            return <AppLoading />
          }
        // console.log(decks)
        // console.log(decks.questions.length)
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Deck List</Text>
                <FlatList
                    data={Object.values(decks)}
                    renderItem={(item) =>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate(
                                'DeckView',
                                {entryId: item.key}
                            )}>
                            <Deck 
                                deckName={item.title} 
                                cardsCount={item.questions.length !== 0 
                                                ? item.questions.length + 'Cards'
                                                : 'No Cards'
                                            }/>
                        </TouchableOpacity>
                        }
                />
            </View>
        )
    }
}

function mapStateToProps (decks) {
    console.log(decks)
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckList)