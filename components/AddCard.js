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

class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }

    submit = () => {
        const card = this.state
        const title = this.props.navigation.state.params.title
        
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
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.title}>Add the question and it's answer:</Text>
                <TextInput
                    style={styles.input}
                    value={question}
                    onChangeText={question => this.setState({ question })}
                    placeholder="Enter the question.."
                />
                <TextInput
                    style={styles.input}
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
        margin: 30,
        marginRight: 40,
        marginRight: 40
    }
})

export default connect()(AddCard)