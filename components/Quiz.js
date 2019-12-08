import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

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

        if ( currentQuestion >= totalQuestions )
            return (
                <View>
                    <Text>You get {correct} / {totalQuestions} correct</Text>

                    <TouchableOpacity 
                        onPress={() => this.setState({correct: 0, incorrect: 0, currentQuestion: 0, showAnswer: false})}>
                        <Text>Restart Quiz</Text>
                    </TouchableOpacity>

                    { clearLocalNotification()
                        .then(setLocalNotification()) }

                    <TouchableOpacity onPress={this.props.navigation.goBack()}>
                        <Text>Back to Deck</Text>
                    </TouchableOpacity>
                </View>
            )

        return(
            <View>
                <View>
                    <Text>{currentQuestion + 1} / {totalQuestions}</Text>
                    <Text>{title}</Text>
                    { showAnswer    
                            ? <Text>{ card.answer }</Text>
                            : <Text>{ card.question }</Text> }
                </View>

                <TouchableOpacity onPress={() => this.setState({ showAnswer: !showAnswer})}>
                    <View>
                    { showAnswer    
                            ? <Text>Show Question</Text>
                            : <Text>Show Answer</Text> }
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => this.setState({ correct: correct+1, currentQuestion: currentQuestion+1, showAnswer: false})}> 
                    <Text>Correct</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => this.setState({ incorrect: incorrect+1, currentQuestion: currentQuestion+1, showAnswer: false})}> 
                    <Text>Incorrect</Text>
                </TouchableOpacity>
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

export default connect(mapStateToProps)(Quiz)