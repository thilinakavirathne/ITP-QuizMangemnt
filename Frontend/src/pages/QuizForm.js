import styled from "styled-components";
import React, { useState } from 'react';
import { HomeFilled } from '@ant-design/icons';
import { Button, Tooltip, Typography, Row, Col, Form, Select, DatePicker, TimePicker, Card, Divider } from 'antd';
import SpacerBoxHorizontal from "../components/SpacerBoxHorizontal";
import CustomFormItem from "../components/CustomFormItem";
import CustomButton from "../components/Button"
import { useEffect } from "react";
import constants from "../constants";
import Question from "../models/question_model";
import axios from "axios";

import "../css/AddQuestionForm.css"; // import the new CSS file



import Loader from "../components/Loader";
import { useHistory, useParams } from "react-router-dom";
const { Text, Title } = Typography;

const { Option } = Select;

const Wrapper = styled.div`
  background-color: #d4d6d9;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: column;
`
const Header = styled.div`
  display:flex;
  width : 100%;
  align-items:center;
  height : 50px;
  background-color:white;
  padding: 0 32px;
`
const TitleWrapper = styled.div`
  background-color: #F30909;
  font-size:1rem;
  padding: 8px 16px;
  border-radius: 10px;
`


const Container = styled.div`
  width : 90vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
`

function QuizForm() {
  const [grades, setGrades] = useState([])
  const [moduleCodes, setModuleCodes] = useState([])
  const [teacherIds, setTeachersIds] = useState([])
  const [moduleCode, setModuleCode] = useState('');
  const [studentGrade, setStudentGrade] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [quizDate, setQuizDate] = useState('');
  const [quizStartTime, setQuizStartTime] = useState('');
  const [quizEndTime, setQuizEndTime] = useState('');
  const [numberOfMCQs, setNumberOfMCQs] = useState('');
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState();
  const [correctAnsweIndex, setCorrectAnswerIndex] = useState()
  const [answer, setAnswer] = useState()
  const [answers, setAnswers] = useState([])
  const [shouldLoad, setShouldLoad] = useState(false)
  const history = useHistory()
  const params = useParams()
  const _id = params.id ?? null;
  const config = {
    rules: [
      {
        type: 'object',
        required: true,
        message: 'Please select time!',
      },
    ],
  };


  useEffect(() => {
    setModuleCodes(constants.moduleCodes)
    setTeachersIds(constants.teacherIds)
    setGrades(constants.grades)

    if (_id != null) {
      axios.get(`${constants.baseUrl}quizzes/${_id}`).then((value) => {

        setModuleCode(value.data["module_code"])
        setStudentGrade(value.data["student_grade"])
        setTeacherId(value.data["teacher_id"])
        setNumberOfMCQs(value.data["number_of_mcqs"])
        setQuizStartTime(value.data["start_time_of_quiz"])
        setQuizEndTime(value.data["end_time_of_quiz"])
        setQuizDate(value.data["date_of_quiz"])

      }).catch(err => {
        console.log(err)
      })
    }

  }, [_id])


  const submit = async () => {
    await createQuiz();
  }



  const createQuiz = async () => {
    setShouldLoad(!shouldLoad)
    const data = {
      "module_code": moduleCode,
      "student_grade": studentGrade,
      "teacher_id": teacherId,
      "date_of_quiz": quizDate,
      "start_time_of_quiz": quizStartTime,
      "end_time_of_quiz": quizEndTime,
      "number_of_mcqs": numberOfMCQs
    }
    //console.log(data)
    await axios.post(`${constants.baseUrl}quizzes`,
      data
    )
      .then(async (response) => {
        const id = response.data["_id"];
        for (var q of questions) {
          const d = {
            question: q.getQuestion(),
            answer_1: q.getAnswers()[0],
            answer_2: q.getAnswers()[1],
            answer_3: q.getAnswers()[2],
            answer_4: q.getAnswers()[3],
            correct_answer: q.getCorrectAnswerIndex(),
            quiz_id: id
          }
          await axios.post(`${constants.baseUrl}questions`,
            d
          ).then(data => { }).catch(err => console.log(err))
        }
      })
      .catch(error => console.error(error))
    setShouldLoad(false)
    history.push("/")
  }

  const updateQuiz = () => {
    const data = {};
    axios.patch(`${constants.baseUrl}quizzes/${_id}`, data).then((value) => {
      console.log(value)
      history.push("/");
    }).catch(err => {
      console.log(err)
    })
  }


  return (
    <Wrapper>
      <Header>
        <div style={{ flex: 1 }}>
          <Tooltip title="search" >
            <Button type="primary" shape="circle" icon={<HomeFilled />} />
          </Tooltip>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <TitleWrapper >
            <Text>
              Upload Quiz
            </Text>
          </TitleWrapper>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "end" }}>

        </div>
      </Header>
      <Container>
        <Form
          style={{ width: "80vw", margin: 0, padding: 0 }}
          initialValues={{
            module_code: moduleCode,
            grade: studentGrade,

          }}
        >
          <>
            <Row>
              <Col span={11}>
                <Form.Item
                  initialValue={_id != null ?? moduleCode}
                  name="module_code"
                  label="Module Code"
                  rules={[{ required: true, message: 'Please select module code!' }]}
                >
                  <Select
                    placeholder="select module code"
                    onChange={(e) => { setModuleCode(e) }}
                    value={moduleCode}
                  >
                    {
                      moduleCodes.map((code, index) => {
                        return <Option value={code} key={index}>{code}</Option>
                      })
                    }
                  </Select>
                </Form.Item>

              </Col>
              <SpacerBoxHorizontal />
              <Col span={11}>
                <Form.Item
                  initialValue={studentGrade}
                  name="grade"
                  label="Select Grade"
                  rules={[{ required: true, message: 'Please select grade!' }]}
                >
                  <Select placeholder="select  grade"
                    onChange={(e) => { setStudentGrade(e) }}
                    value={studentGrade}
                  >
                    {
                      grades.map((code, index) => {
                        return <Option value={code} key={index}>{code}</Option>
                      })
                    }
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={11}>
                <Form.Item
                  name="teacher_id"
                  label="Select Teacher Id"
                  rules={[{ required: true, message: 'Please select teacher s id!' }]}
                >
                  <Select placeholder="select  teacher id"
                    onChange={(e) => { setTeacherId(e) }}
                  >
                    {
                      teacherIds.map((code, index) => {
                        return <Option value={code} key={index}>{code}</Option>
                      })
                    }
                  </Select>
                </Form.Item>
              </Col>
              <SpacerBoxHorizontal />
              <Col span={11}>
                <Form.Item name="quiz-date" label="Quiz Date" {...config}>
                  <DatePicker onChange={(e) => { setQuizDate(e) }} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item name="start-time" label="Quiz Start Time" {...config}>
                  <TimePicker onChange={(e) => { setQuizStartTime(e) }} />
                </Form.Item>
              </Col>
              <SpacerBoxHorizontal />
              <Col span={6}>
                <Form.Item
                  initialValue={quizEndTime}
                  name="end-time" label="Quiz End Time" {...config}>
                  <TimePicker value={quizEndTime} onChange={(e) => { setQuizEndTime(e) }} />
                </Form.Item>
              </Col>
              <SpacerBoxHorizontal />

              <CustomFormItem
                onChange={(e) => { setNumberOfMCQs(e.target.value) }}
                required={true}
                label={"Number of MCQ's"}
                colspan={6}
                message={"Number of mcqs are required!"}
                value={numberOfMCQs}
              />

            </Row>
            <Title level={3}>Questions</Title>
            <Card style={{ marginBottom: 16 }}>
              <ol>{
                questions && questions.map((question, index) => {
                  return <li key={index}>{
                    <p>
                      Question :   {question.getQuestion()}
                      <Divider />
                      Answers
                      <Divider />
                      {
                        question.answers.map((answer, index) => {
                          return <p key={index} >{index + 1} {answer} </p>
                        })
                      }
                    </p>
                  }</li>
                })
              }</ol>

            </Card>
            {_id == null && <Title level={3}>Add Question</Title>}

            {_id == null && <CustomFormItem
              value={question}
              label={"Enter Question"}
              required={true}
              message={"Please enter an question"}
              onChange={(e) => { setQuestion(e.target.value) }}
              colspan={24}
            />}

            {_id == null && <ol>{answers.map((item, index) => (
              <li key={index}>{item}</li>
            ))}</ol>}

            {answers.length <= 3 && _id == null && <Row>
              <CustomFormItem
                label={"Add Answer"}
                required={true}
                value={answer}
                message={"Please enter an question"}
                onChange={(e) => { setAnswer(e.target.value) }}
                colspan={16}
              />
              <SpacerBoxHorizontal />
              <Button
                type="primary"
                onClick={() => {
                  let a = answers;
                  a.push(answer)
                  setAnswers([...a])
                  setAnswer("")

                }}
              >
                Add Answer
              </Button>
            </Row>}
            {_id == null && <CustomFormItem
              label={"Correct Answer Index"}
              required={true}
              message={"Correct Answer Index"}
              colspan={8}
              onChange={(e) => { setCorrectAnswerIndex(e.target.value) }}
              value={correctAnsweIndex}
            />}

            {_id == null && <Row>
              <Col span={24} >
                <CustomButton
                  onClick={() => {

                    if (_id == null) {
                      if (question !== "" && answers.length > 0 && correctAnsweIndex !== "") {
                        const q = new Question(
                          question,
                          answers[0] ?? "",
                          answers[1] ?? "",
                          answers[2] ?? "",
                          answers[3] ?? "",
                          parseInt(correctAnsweIndex)
                        );
                        const qs = questions;
                        qs.push(q)
                        setQuestions(qs)
                        setQuestion("")
                        setAnswers([])
                        setAnswer("")
                        setCorrectAnswerIndex("")
                        console.log(questions.length)
                      }
                    }
                    else {
                      updateQuiz();
                    }

                  }}
                  text={"Add Question"}
                  color={"#13A43B"}
                  width={"100%"}
                  height={"35px"}
                />
              </Col>
            </Row>}
            <div style={{ height: 16 }} />

            {
              shouldLoad ? <Loader /> :
                <Row>
                  <Col span={24} >
                    <CustomButton
                      onClick={() => {
                        submit();

                      }}
                      text={_id == null ? "Submit" : "Update"}
                      color={"#13A43B"}
                      width={"100%"}
                      height={"35px"}
                    />
                  </Col>
                </Row>}

          </>
        </Form>
      </Container>
      {

      }
    </Wrapper>
  );
}

export default QuizForm;
