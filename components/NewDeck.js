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
 import { addDeck } from '../actions/index'
 import { SaveDeckTitle } from '../utils/api'
 import { white, purple } from '../utils/colors'

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

        //to deck view
    }

    render() {
        const { input } = this.state
        return(
            <KeyboardAvoidingView behavior='padding' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>What is the title of your new deck?</Text>
                <TextInput
                    value={input}
                    onChange={this.handleTextChange}
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
        padding: 20,
        backgroundColor: white
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    AndroidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
      },
})

export default connect()(NewDeck)