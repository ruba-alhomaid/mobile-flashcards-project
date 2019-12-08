import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

class DeckView extends Component {

    render() {
        const deck = this.props.navigation.state.params

        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{ deck.deck.title }</Text>
                <Text>{ deck.deck.questions.length !== 0 
                            ? deck.deck.questions.length + 'Cards'
                            : 'No Cards'
                        }</Text>
                <Button
                    title="Add Card"
                    onPress={() => this.props.navigation.navigate('AddCard',{title: deck.deck.title})}
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