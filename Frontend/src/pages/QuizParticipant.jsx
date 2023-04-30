import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "../css/Question.css"
import { useParams } from 'react-router-dom'
import constants from '../constants';

import styled from "styled-components";
import Title from 'antd/es/typography/Title';
import { Divider } from 'antd';
import Button from '../components/Button';
import Certificate from '../components/Certificate';

const Body = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`


const QuizParticipant = () => {

    const [quizName, setQuizName] = useState()
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [numOfCorrectAnswes, setNumOfCorrectAnswers] = useState(0)
    const [certifcate, setCertificate] = useState(false)
    const params = useParams();

    const _id = params.id;


    const fetchQuizDetails = async () => {
        axios.get(`${constants.baseUrl}quizzes/${_id}`).then((data) => {
            setQuizName(`${data.data["module_code"]} Grade ${data.data["student_grade"]}`)
        }).catch(err => {
            console.log("get quiz details failed " + err)
        })
    }


    const fetchQuestions = async () => {
        await axios.get(`${constants.baseUrl}questions`).then((data) => {
            let qs = data.data
            qs = qs.filter((data) => {
                return data.quiz_id === _id;
            })
            setQuestions(qs)
        }).catch(err => {
            console.log("get questions failed " + err)
        })
    }


    const submiAnswers = () => {
        let counter = 0;
        for (let a of answers) {
            const id = a.qid;
            const answerIndex = questions.find((question) => question._id === id);
            if (answerIndex !== undefined) {
                if (answerIndex["correct_answer"] === a["answerIndex"]) {
                    counter++;
                }
            }
        }
        setNumOfCorrectAnswers(counter)
        setCertificate(true)

    }

    const generateAnswerList = (qid, answerIndex) => {
        let a = answers;
        a.push({
            qid, answerIndex: parseInt(answerIndex)
        })
        setAnswers(a)
        console.log(answers)
    }

    useEffect(() => {
        fetchQuizDetails().then(() => fetchQuestions());
    }, [_id])
    return (
        <Body>


            <Title level={3}>{quizName}</Title>
            <Divider />
            {
                certifcate && <Certificate
                    numCorrectAnswers={numOfCorrectAnswes}
                    numTotalAnswers={questions.length}
                    studentName={"Test User"}
                    moduleName={quizName}
                />
            }
            {
                !certifcate && questions.map((question, index) => (
                    <div key={question.question} className='question'>
                        <h2>{question.question}</h2>
                        <ul>
                            <li key={question.answer_1}>
                                <label>
                                    <input
                                        onChange={(val) => { generateAnswerList(question._id, val.target.value) }}
                                        type="radio" name={`question-${question.question}`} value={1} />
                                    {question.answer_1}
                                </label>
                            </li>
                            <li key={question.answer_2}>
                                <label>
                                    <input
                                        onChange={(val) => { generateAnswerList(question._id, val.target.value) }}
                                        type="radio" name={`question-${question.question}`} value={2} />
                                    {question.answer_2}
                                </label>
                            </li>
                            <li key={question.answer_3}>
                                <label>
                                    <input
                                        onChange={(val) => { generateAnswerList(question._id, val.target.value) }}
                                        type="radio" name={`question-${question.question}`} value={3} />
                                    {question.answer_3}
                                </label>
                            </li>
                            <li key={question.answer_4}>
                                <label>
                                    <input
                                        onChange={(val) => { generateAnswerList(question._id, val.target.value) }}
                                        type="radio" name={`question-${question.question}`} value={4} />
                                    {question.answer_4}
                                </label>
                            </li>
                        </ul>
                    </div>
                ))}
       {  !certifcate &&   <Button
                onClick={() => {
                    submiAnswers();
                }}
                text={"Submit"}
                color={"#33C20F"}
                width={"80%"}
                height={40}
            />}
        </Body>
    )
}

export default QuizParticipant