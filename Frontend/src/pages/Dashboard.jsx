import React from 'react'
import styled from 'styled-components'
import { HomeFilled, ClearOutlined } from '@ant-design/icons';
import { Button, Tooltip, Typography, Input, Row, Col, Modal } from 'antd';
import MyButton from '../components/Button';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';
import constants from '../constants';
import { useParams } from 'react-router-dom';
import axios from 'axios';



const { Text, Title } = Typography;
const { Search } = Input;
const Wrapper = styled.div`
  width : 100%;
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
  justify-content: center;
`

const Body = styled.div`
  width: 80%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
`

const BottomRow = styled.div`
  height: 60px;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding: 0 32px;
`

const TitleWrapper = styled.div`
  background-color: #F30909;
  font-size:1rem;
  padding: 8px 16px;
  border-radius: 10px;
`


const BodySection = styled.div`
    width:  800px;
    background-color: #B8C0EC;
    margin-top: 16px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
`

const QuizCard = styled.div`
    width: 250px;
    cursor:  ${props => props.isPartipant ? "pointer" : "normal"};
    height: 80%;
    margin: 16px 0;
    border-radius: 12px;
    background-color: #33C20F;
    align-items: center;
    display: flex;
    flex-direction: column;
`
const ConfirmationButton = styled.button`
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1.2rem;
  cursor: pointer;
`;
const Dashboard = () => {
  const history = useHistory();
  const [quizes, setQuizes] = useState([])
  const [constQuizes, setConstQuizes] = useState([])
  const [query, setQuery] = useState("")
  const isPartipant = useParams().isPartipant;

  

  const onSearch = (e) => {
    setQuery(e.target.value);

    let q = constQuizes.filter((quiz) => {
      return quiz["student_grade"] === query || (quiz["module_code"].includes(query));
    })
    setQuizes(q)
  }


  useEffect(() => {
    fetch(`${constants.baseUrl}quizzes`)
      .then(response => response.json())
      .then(data => { setQuizes(data); setConstQuizes(data); })
      .catch(error => console.log(error));



  }, [])

  return (
    <>
      <Wrapper>
        <Header>
          <div style={{ flex: 1 }}>
            <Tooltip title="home" >
              <Button
                onClick={() => { history.push("/") }}
                type="primary" shape="circle" icon={<HomeFilled />} />
            </Tooltip>
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <TitleWrapper >
              <Text>
                Quiz Dashboard
              </Text>
            </TitleWrapper>
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "end" }}>
            <Search placeholder="input search text" value={query} onChange={(event) => { onSearch(event) }} style={{ width: 200 }} />
            <Tooltip title="clear" >
              <Button
                onClick={() => { setQuizes(constQuizes); setQuery("") }}
                type="primary" shape="circle" icon={<ClearOutlined />} />
            </Tooltip>
          </div>
        </Header>
        <Body>

          <Row>
            {
              quizes.map((quiz) => {
                return <Col span={20} key={quiz["_id"]}>
                  <BodySection>
                    <QuizCard
                      isPartipant={isPartipant}
                      onClick={() => {
                        if (isPartipant) {
                          history.push("/quiz-particpant/" + quiz._id)
                        }
                      }}
                    >
                      <Title level={3}>
                        {`${quiz["module_code"]} GRADE ${quiz["student_grade"]}`}
                      </Title>
                      {!isPartipant && <div style={{ display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center" }}>
                        <Button type="primary" onClick={() => {
                          history.push("/update-quiz/" + quiz._id)
                        }}>
                          Update
                        </Button>

                        <Button
                          type="primary"
                          danger
                          onClick={async (e) => {
                            await axios.delete(`${constants.baseUrl}quizzes/${quiz._id}`)
                            await fetch(`${constants.baseUrl}quizzes`)
                              .then(response => response.json())
                              .then(data => { setQuizes(data); setConstQuizes(data); })
                              .catch(error => console.log(error));
                            history.push("/")
                          }}>
                          Delete
                        </Button>

                      </div>}
                    </QuizCard>
                  </BodySection>
                </Col>
              })
            }
          </Row>
        </Body>
        {!isPartipant && <BottomRow>
          <MyButton onClick={() => { }} text={"Analyze Result"} color={"#121111"} />
          <MyButton onClick={() => {
            history.push("/add-quiz")

          }} text={"Add New Quiz"} color={"#F60707"} />
          <MyButton onClick={() => {
            history.push("/particpant/true")
          }}
            text={"Participate to quiz"}
            color={"#121111"} />
        </BottomRow>}

      </Wrapper>

    </>
  )
}

export default Dashboard