import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, Platform, StyleSheet, } from 'react-native'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { white, green, gray, lightGray, red, shinGreen } from '../utils/colors'

function SubmitBtn ({ onPress, title }) {
    return(
        <View style={{justifyContent: 'flex-end'}}>
            <TouchableOpacity 
                style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                onPress={onPress}>
                    <Text style={styles.submitBtnText}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

class Quiz extends Component {
    state = {
        correct: 0,
        incorrect: 0,
        currentQuestion: 0,
        showAnswer: false
    }
    render() {
        const { title, cards } = this.props
        const { correct, incorrect, currentQuestion, showAnswer } = this.state
        let card = cards[currentQuestion]
        let totalQuestions = cards.length

        if ( totalQuestions === 0 )
            return (
                <View style={{ flex: 1, backgroundColor: lightGray }}>
                    <Text style={[styles.text , {marginTop: 200}]}>There are no cards!</Text>
                    <SubmitBtn 
                        title="Back to Deck"
                        onPress={() => this.props.navigation.goBack()}/>
                </View>
            )

        if ( currentQuestion >= totalQuestions ) {
            { clearLocalNotification()
                .then(setLocalNotification()) }
            return (
                <View style={{ flex: 1, backgroundColor: lightGray }}>
                    <Text style={[styles.text ,{marginBottom: 10},{marginTop: 90}]}>You get</Text>
                    <Text style={[styles.title ,{marginTop: 10}, {marginBottom: 10}]}>{correct} / {totalQuestions}</Text>
                    <Text style={styles.text}>correct</Text>

                    <SubmitBtn 
                        title="Restart Quiz"
                        onPress={() => this.setState({correct: 0, incorrect: 0, currentQuestion: 0, showAnswer: false})}/>

                    <SubmitBtn
                        title="Back to Deck"
                        onPress={() => this.props.navigation.goBack()}/>
                </View>
            )}

        return(
            <View style={{ flex: 1, backgroundColor: lightGray }}>
                <View>
                    <Text style={{fontSize:20, color:gray, textAlign:'left', margin:10}}>{currentQuestion + 1} / {totalQuestions}</Text>
                    <Text style={styles.title}>{title}</Text>
                    { showAnswer    
                            ? <Text style={styles.text}>{ card.answer }</Text>
                            : <Text style={styles.text}>{ card.question }</Text> }
                </View>

                <TouchableOpacity onPress={() => this.setState({ showAnswer: !showAnswer})}>
                    <View>
                    { showAnswer    
                            ? <Text style={styles.smallText}>Show Question</Text>
                            : <Text style={styles.smallText}>Show Answer</Text> }
                    </View>
                </TouchableOpacity>

                <View style={{bottom: 0, justifyContent: 'flex-end'}}>
                    <TouchableOpacity 
                        style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn , {backgroundColor: shinGreen}]}
                        onPress={() => this.setState({ correct: correct+1, currentQuestion: currentQuestion+1, showAnswer: false})}>
                            <Text style={styles.submitBtnText}>Correct</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn , {backgroundColor: red}]}
                        onPress={() => this.setState({ incorrect: incorrect+1, currentQuestion: currentQuestion+1, showAnswer: false})}>
                            <Text style={styles.submitBtnText}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

function mapStateToProps (decks, props) {
    const title = props.navigation.state.params.title
    const cards = decks[title].questions 

    return {
        title,
        cards
    }
}

const styles = StyleSheet.create({
    iosSubmitBtn: {
        backgroundColor: green,
        padding: 10,
        borderRadius: 7,
        height: 45,
        alignSelf: 'stretch',
        justifyContent: 'center',
        margin: 20,
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
        margin: 20,
        marginTop: 70
    },
    text: {
        fontSize: 30, 
        color: gray,
        textAlign: 'center',
        fontWeight: '300',
        margin: 10,
        marginBottom:30
    },
    smallText: {
        fontSize: 20, 
        color: gray,
        textAlign: 'center',
        fontWeight: '300',
        margin: 10,
        marginBottom:30
    }
})

export default connect(mapStateToProps)(Quiz)