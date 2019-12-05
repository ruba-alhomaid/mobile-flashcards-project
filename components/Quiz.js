import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Card from './Card'

class Quiz extends Component {
    render() {
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Quiz</Text>
                <Card />
            </View>
        )
    }
}

export default Quiz