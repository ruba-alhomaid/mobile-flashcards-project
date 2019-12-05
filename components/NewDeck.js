import React, { Component } from 'react'
import { View, Text } from 'react-native'

class NewDeck extends Component {
    render() {
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>New Deck</Text>
            </View>
        )
    }
}

export default NewDeck