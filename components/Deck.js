import React, { Component } from 'react'
import { View, Text } from 'react-native'

class Deck extends Component {
    render() {
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Deck</Text>
            </View>
        )
    }
}

export default Deck