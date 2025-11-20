const QuestionScreen = ({ question, selectedOptionId, onSelect, onNext }) => {
  const hasAnswered = Boolean(selectedOptionId);

  const handleClick = (optionId) => {
    if (hasAnswered) {
      return;
    }

    onSelect(question.id, optionId);
  };

  return (
    <div>
      <h2 className="question-title">{question.text}</h2>
      <div className="options">
        {question.options.map(({ id, label, isCorrect }) => {
          let className = "option-button";

          if (hasAnswered) {
            if (isCorrect) {
              className += " option-correct";
            } else if (id === selectedOptionId && !isCorrect) {
              className += " option-wrong-selected";
            } else {
              className += " option-neutral";
            }
          }

          return (
            <button
              key={id}
              type="button"
              className={className}
              onClick={() => handleClick(id)}
            >
              {label}
            </button>
          );
        })}
      </div>

      {hasAnswered && (
        <>
          <div className="summary">
            After selection, correct answers are highlighted in green, and your
            wrong choice (if any) is highlighted in red.
          </div>
          <div className="button-row" style={{ marginTop: "12px" }}>
            <button type="button" className="button-primary" onClick={onNext}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionScreen;
