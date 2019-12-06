import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { receiveDecks } from '../actions/index'
import Deck from './Deck'

class DeckList extends Component {

    componentDidMount() {
        this.props.dispatch(receiveDecks())
    }

    render() {
        const decks = this.props
        
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Deck List</Text>
                <FlatList
                    data={Object.values(decks)}
                    renderItem={(item) =>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate(
                                'DeckView',
                                {entryId: item.id}
                            )}>
                            <Deck id={item.id}/>
                        </TouchableOpacity>
                        }
                />
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