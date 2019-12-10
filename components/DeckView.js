import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { white, green, gray, lightGray } from '../utils/colors'

function SubmitBtn ({ onPress, title }) {
    return(
        <TouchableOpacity 
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
                <Text style={styles.submitBtnText}>{title}</Text>
        </TouchableOpacity>
    )
}

class DeckView extends Component {

    render() {
        const deck = this.props.navigation.state.params

        return(
            <View style={styles.container}>
                <Text style={styles.title}>{ deck.deck.title }</Text>
                <Text style={styles.text}>{ deck.deck.questions.length !== 0 
                            ? deck.deck.questions.length + 'Cards'
                            : 'No Cards'
                        }</Text>
                <SubmitBtn
                    title="Add Card"
                    onPress={() => this.props.navigation.navigate('AddCard',{title: deck.deck.title})}
                    />
                <SubmitBtn
                    title="Start Quiz"
                    onPress={() => this.props.navigation.navigate('Quiz',{title: deck.deck.title})}
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: lightGray
    },
    iosSubmitBtn: {
        backgroundColor: green,
        padding: 10,
        borderRadius: 7,
        height: 45,
        alignSelf: 'stretch',
        justifyContent: 'center',
        margin: 20
    },
    AndroidSubmitBtn: {
        backgroundColor: green,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',
        alignSelf: 'stretch',
        margin: 20
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10
    },
    text: {
        fontSize: 20, 
        color: gray,
        textAlign: 'center',
        fontWeight: '300',
        margin: 10,
        marginBottom:30
    }
})

export default DeckView