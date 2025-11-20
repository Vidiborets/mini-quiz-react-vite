import { STEPS } from "../utils/index.js";

// Result components
const Progress = ({ step, answers, totalQuestions }) => {
  // Indexing steps from utils
  const stepIndex = STEPS.indexOf(step);
  // Current step number for display (1-based)
  const currentStepNumber = stepIndex === -1 ? 1 : stepIndex + 1;

  // Use key if answers is an object
  const answeredCount = Object.keys(answers).length;
  const percent = (currentStepNumber / STEPS.length) * 100;

  return (
    <div className="progress">
      <div className="progress-top">
        <span>
          Questions: {answeredCount}/{totalQuestions}
        </span>
        <span>
          Step {currentStepNumber} of {STEPS.length}
        </span>
      </div>
      <div className="progress-bar">
        <div className="progress-bar-inner" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};

export default Progress;
