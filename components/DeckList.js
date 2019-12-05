import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import Deck from './Deck'

class DeckList extends Component {
    render() {
        const decks = this.props
        
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Deck List</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate(
                        'DeckView'
                    )}>
                    <Deck />
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps (decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckList)