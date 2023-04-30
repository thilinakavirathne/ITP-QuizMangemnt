import React from 'react';
import styled from 'styled-components';

const CertificateWrapper = styled.div`
  width: 500px;
  height: 700px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  font-family: 'Montserrat', sans-serif;
`;

const CertificateTitle = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin: 0;
`;

const CertificateText = styled.p`
  font-size: 1.5rem;
  text-align: center;
  margin: 0;
`;

const Certificate = ({ studentName, moduleName, numCorrectAnswers, numTotalAnswers }) => {
  const percentCorrect = ((numCorrectAnswers / numTotalAnswers) * 100).toFixed(2);

  return (
    <CertificateWrapper>
      <CertificateTitle>Certificate of Completion</CertificateTitle>
      <CertificateText>This certifies that</CertificateText>
      <CertificateTitle>{studentName}</CertificateTitle>
      <CertificateText>has successfully completed the</CertificateText>
      <CertificateTitle>{moduleName} Module</CertificateTitle>
      <CertificateText>with a score of {numCorrectAnswers}/{numTotalAnswers} ({percentCorrect}%).</CertificateText>
      <CertificateText>Issued on {new Date().toLocaleDateString()}.</CertificateText>
    </CertificateWrapper>
  );
};

export default Certificate;
