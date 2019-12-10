import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { white, gray } from '../utils/colors'

class Deck extends Component {
    render() {
        const deckName = this.props.deckName
        const cardsCount = this.props.cardsCount

        return(
            <View style={styles.card}>
                <Text style={styles.cardTitle}>{ deckName }</Text>
                <Text style={styles.cardText}>{ cardsCount }</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'stretch',
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 9.5,
        shadowOpacity: 0.35,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        elevation: 2,
        flexGrow: 1,
        flexShrink: 1,
        shadowOffset: {
          width: 0,
          height: 5
        },
    },
    cardTitle: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '500',
    },
    cardText: {
        fontSize: 16, 
        color: gray,
        textAlign: 'center',
        fontWeight: '300',
    }
})

export default Deck