const ResultScreen = ({ email, questions, answers, onRestart }) => {
  const selectedAnswers = questions.map(({ id, options, text }) => {
    const selectedId = answers[id];
    const selectedOption = options.find(
      ({ id: optionId }) => optionId === selectedId
    );
    const { label, isCorrect } = selectedOption || {};
    return {
      question: text,
      selectedLabel: selectedOption ? label : "No answer",
      isCorrect: selectedOption ? isCorrect : false,
    };
  });

  const correctCount = selectedAnswers.filter(
    ({ isCorrect }) => isCorrect
  ).length;
  const incorrectCount = selectedAnswers.filter(
    ({ isCorrect }) => !isCorrect
  ).length;

  const handleCopy = async () => {
    const summary = `Correct: ${correctCount}, Wrong: ${incorrectCount}\n\n`;
    const text =
      `Email: ${email}\n` +
      summary +
      selectedAnswers
        .map(
          (a, index) =>
            `Q${index + 1}: ${a.question}\nYour answer: ${a.selectedLabel} (${
              a.isCorrect ? "correct" : "wrong"
            })`
        )
        .join("\n\n");

    try {
      await navigator.clipboard.writeText(text);
      alert("Result copied to clipboard");
    } catch (e) {
      console.log(e);
      alert("Failed to copy result");
    }
  };

  return (
    <div>
      <h2 className="question-title">Your result</h2>
      <p>
        <strong>Email:</strong> {email}
      </p>

      <div className="badge">
        Score: {correctCount}/{selectedAnswers.length} • {correctCount} correct,{" "}
        {incorrectCount} wrong
      </div>

      <div className="result-list">
        {selectedAnswers.map(
          ({ question, selectedLabel, isCorrect }, index) => (
            <div key={index} className="result-item">
              <div className="result-item-question">
                Q{index + 1}. {question}
              </div>
              <div className="result-item-answer">
                Your answer:{" "}
                <span style={{ color: isCorrect ? "#166534" : "#b91c1c" }}>
                  {selectedLabel} ({isCorrect ? "correct" : "wrong"})
                </span>
              </div>
            </div>
          )
        )}
      </div>

      <div className="button-row">
        <button type="button" className="button-primary" onClick={handleCopy}>
          Copy result
        </button>
        <button type="button" className="button-secondary" onClick={onRestart}>
          Start again
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
