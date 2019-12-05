import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

class DeckView extends Component {
    render() {
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Deck View</Text>
                <Button
                    title="Add Card"
                    onPress={() => this.props.navigation.navigate('AddCard')}
                    />
                <Button
                    title="Start Quiz"
                    onPress={() => this.props.navigation.navigate('Quiz')}
                    />
            </View>
        )
    }
}

export default DeckView