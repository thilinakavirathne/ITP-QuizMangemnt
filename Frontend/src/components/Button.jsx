import React from 'react'
import styled from 'styled-components'
import Typography from 'antd/es/typography/Typography'
const {Text} = Typography
const Wrapper = styled.div`
    height : ${props=>props.height ?? "50px"};
    background-color: ${props => props.color};
    color : white;
    font-size :1rem;
    padding : 0.5rem 1rem;
    align-items: center;
    display: flex;
    justify-content: center;
    cursor: pointer;
    border-radius: 8px;
    width :  ${props=>props.width ?? "200px"};
`


const Button = ({onClick,text,color,width,height}) => {
    return (
        <Wrapper onClick={onClick} color={color} width={width} height={height}>
            <Text style={{color:"white"}}>
                {text}
            </Text>
        </Wrapper>
    )
}

export default Button