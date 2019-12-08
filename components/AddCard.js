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
import { addCard } from '../actions/index'
import { addCardToDeck } from '../utils/api'
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

class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }

    submit = () => {
        const card = this.state
        const title = this.props.navigation.state.params.title
        console.log(card, title)
        this.props.dispatch(addCard(title, card))

        this.setState(() => ({
            question: '',
            answer: ''
        }))

        addCardToDeck(title, card)

        this.props.navigation.goBack()
    }

    render() {
        const { question, answer } = this.state

        return(
            <KeyboardAvoidingView behavior='padding' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    value={question}
                    onChangeText={question => this.setState({ question })}
                    placeholder="Enter the question.."
                />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    value={answer}
                    onChangeText={answer => this.setState({ answer })}
                    placeholder="Enter the answer.."
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

export default connect()(AddCard)