class Question {
    constructor(question, answer1, answer2, answer3, answer4, correctAnswerIndex) {
        this.question = question;
        this.answers = [answer1, answer2, answer3, answer4];
        this.correctAnswerIndex = correctAnswerIndex;
    }

    getQuestion() {
        return this.question;
    }

    getAnswers() {
        return this.answers;
    }

    getCorrectAnswerIndex() {
        return this.correctAnswerIndex;
    }

    isCorrectAnswer(index) {
        return this.correctAnswerIndex === index;
    }
}


export default Question