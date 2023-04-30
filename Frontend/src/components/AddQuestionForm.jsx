import React, { useState } from "react";

function AddQuestionForm(props) {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleAnswerChange = (event, index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = event.target.value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onAddQuestion({ question, answers });
    setQuestion("");
    setAnswers(["", "", "", ""]);
  };

  return (
    <form className="question-form" onSubmit={handleSubmit}>
      <label>
        Question Text:
        <input
          type="text"
          value={question}
          onChange={handleQuestionChange}
          required
        />
      </label>
      <label>
        Answer 1:
        <input
          type="text"
          value={answers[0]}
          onChange={(event) => handleAnswerChange(event, 0)}
          required
        />
      </label>
      <label>
        Answer 2:
        <input
          type="text"
          value={answers[1]}
          onChange={(event) => handleAnswerChange(event, 1)}
          required
        />
      </label>
      <label>
        Answer 3:
        <input
          type="text"
          value={answers[2]}
          onChange={(event) => handleAnswerChange(event, 2)}
          required
        />
      </label>
      <label>
        Answer 4:
        <input
          type="text"
          value={answers[3]}
          onChange={(event) => handleAnswerChange(event, 3)}
          required
        />
      </label>

      <button type="submit">Add Question</button>
    </form>
  );
}

export default AddQuestionForm;
