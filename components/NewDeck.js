import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
    Text, 
    TextInput, 
    Platform,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity
 } from 'react-native'
import { addDeck, getDeck } from '../actions/index'
import { SaveDeckTitle } from '../utils/api'
import { white, green, lightGray } from '../utils/colors'

function SubmitBtn ({ onPress }) {
    return(
        <TouchableOpacity 
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
                <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
}

class NewDeck extends Component {
    state = {
        input: ''
    }

    handleTextChange = (input) => {
        this.setState(() => ({
            input
        }))
    } 

    submit = () => {
        const title = this.state.input

        this.props.dispatch(addDeck(title))

        this.setState(() => ({
            input: ''
        }))

        SaveDeckTitle(title)

        this.props.navigation.navigate('DeckList')
    }

    render() {
        const { input } = this.state
        return(
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.title}>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={this.handleTextChange}
                    placeholder="Deck's title"
                />
                <SubmitBtn onPress={this.submit}/>
            </KeyboardAvoidingView>
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
    input: { 
        height: 40, 
        borderRadius: 7,
        borderColor: 'gray', 
        borderWidth: 1,
        alignSelf: 'stretch',
        padding: 10,
        margin: 20
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
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 30
    }
})

export default connect()(NewDeck)