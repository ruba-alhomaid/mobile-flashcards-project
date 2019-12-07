import React, { Component } from 'react'
import { View, Text } from 'react-native'

class Deck extends Component {
    render() {
        const deckName = this.props.deckName
        const cardsCount = this.props.cardsCount

        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{ deckName }</Text>
                <Text>{ cardsCount }</Text>
            </View>
        )
    }
}

export default Deck