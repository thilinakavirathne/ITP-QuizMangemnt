import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import constants from '../constants'
import styled from 'styled-components'
import Title from 'antd/es/typography/Title'
import { Form, Row } from 'antd'
import CustomFormItem from '../components/CustomFormItem'
import Button from '../components/Button'
import { useHistory } from 'react-router-dom'


const Container = styled.div`
    width: 100%;
    height : 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const UpdateQuiz = () => {
    const hist =useHistory()
    const [moduleCode, setModuleCode] = useState('');
    const [studentGrade, setStudentGrade] = useState('');
    const [teacherId, setTeacherId] = useState('');
    const [quizDate, setQuizDate] = useState('');
    const [quizStartTime, setQuizStartTime] = useState('');
    const [quizEndTime, setQuizEndTime] = useState('');
    const [numberOfMCQs, setNumberOfMCQs] = useState('');
    const params = useParams();
    const _id = params.id;

    useEffect(() => {
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
    return (
        <Container>
            <Title level={4} >Update Quiz</Title>
            <Form style={{ width: 500 }}>
                <Row>
                    <CustomFormItem
                        value={moduleCode}
                        label={"Module Code"}
                        message={"Please enter module code"}
                        colspan={24}
                        onChange={(e) => { setModuleCode(e.target.value) }}
                        required={true} />
                </Row>
                <Row>
                    <CustomFormItem
                        value={teacherId}
                        label={"Teachers Id"}
                        message={"Please enter teacher id"}
                        colspan={24}
                        onChange={(e) => { setTeacherId(e.target.value) }}
                        required={true} />
                </Row>
                <Row>
                    <CustomFormItem
                        value={studentGrade}
                        label={"Student Grade"}
                        message={"Please enter student grade"}
                        colspan={24}
                        onChange={(e) => { setStudentGrade(e.target.value) }}
                        required={true} />
                </Row>
                <Row>
                    <CustomFormItem
                        value={quizStartTime}
                        label={"Quiz Start Time"}
                        message={"Please enter quiz start time"}
                        colspan={11}
                        onChange={(e) => { setQuizStartTime(e.target.value) }}
                        required={true} />

                    <CustomFormItem
                        value={quizStartTime}
                        label={"Quiz End Time"}
                        message={"Please enter quiz end time"}
                        colspan={11}
                        onChange={(e) => { setQuizEndTime(e.target.value) }}
                        required={true} />
                </Row>
                <Row>
                    <CustomFormItem
                        value={quizDate}
                        label={"Quiz Start Date"}
                        message={"Please enter quiz date"}
                        colspan={15}
                        onChange={(e) => { setQuizDate(e.target.value) }}
                        required={true} />
                </Row>
                <Button
                    text={"Update"}
                    color={"#33C20F"}
                    onClick={async() => {
                        const data = {
                            "module_code": moduleCode,
                            "student_grade": studentGrade,
                            "teacher_id": teacherId,
                            "date_of_quiz": quizDate,
                            "start_time_of_quiz": quizStartTime,
                            "end_time_of_quiz": quizEndTime,
                            "number_of_mcqs": numberOfMCQs,
                        }
                     await   axios.patch(`${constants.baseUrl}quizzes/${_id}`, data);
                     hist.push("/")
                    }}
                    width={"100%"}
                    height={"30px"} />
            </Form>
        </Container>
    )
}

export default UpdateQuiz