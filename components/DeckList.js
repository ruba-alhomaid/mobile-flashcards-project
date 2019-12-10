import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { receiveDecks } from '../actions/index'
import { AppLoading } from 'expo'
import Deck from './Deck'
import { lightGray } from '../utils/colors'

class DeckList extends Component {
    componentDidMount() {
        this.props.dispatch(receiveDecks())
    }

    render() {
        const { decks } = this.props

        if ( Object.entries(decks).length === 0 ) {
            return <AppLoading />
          }
        
        return(
            <View style={styles.container}>
                <FlatList
                    data={Object.values(decks)}
                    renderItem={(item) =>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate(
                                'DeckView',
                                {deck: item.item}
                            )}>
                            <Deck 
                                deckName={item.item.title} 
                                cardsCount={item.item.questions.length !== 0 || item.item.questions.length !== 'undefined'
                                                ? item.item.questions.length + ' Cards'
                                                : 'No Cards'
                                            }
                            />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: lightGray
    },
})

export default connect(mapStateToProps)(DeckList)