import React, {Component} from 'react'
import IncorrectCard from './IncorrectCard.js'

class IncorrectQuestContainer extends Component {
  constructor() {
    super()
    this.state = {
      userQuestions: []
    }
  }

  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/users/${this.props.user}`)
      .then(resp => resp.json())
      .then(questions => this.setState({userQuestions: questions.user_questions}))
  }

  incorrectQuestions = () => {
    let question
    if (this.state.userQuestions !== null) {
      question = this.state.userQuestions.filter(obj => obj.answeredCorrectly === false)

    }
    return question
  }

  incorrectQuestionsIds = () => {
    let question = this.incorrectQuestions()
    let questionIds = question.map(question => question.question_id)
    return questionIds
  }

  questions = () => {
    let incorrectQIds = this.incorrectQuestionsIds()
    let questions = this.props.allQuestions.filter(question => incorrectQIds.includes(question.id))
    return questions
  }

  singleIncorrectQuestion = () => {
    let questions = this.questions()
    return questions.map(question => <IncorrectCard question={question} />)
  }

  render(){

    return(
      <div>
        {this.singleIncorrectQuestion()}
      </div>
    )
  }

}

export default IncorrectQuestContainer
