import { useEffect, useReducer, useState } from "react";
import { questions } from "./lib/qustions";
import QuestionScreen from "./components/QuestionScreen.jsx";
import EmailScreen from "./components/EmailScreen.jsx";
import ResultScreen from "./components/ResultScreen.jsx";
import Progress from "./components/Progress.jsx";
import quizReducer from "./lib/quizReducer.js";

const STORAGE_KEY = "mini_quiz_state_v1";

const initialState = {
  step: "question1",
  answers: {},
  email: "",
};

function App() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const [isHydrated, setIsHydrated] = useState(false);

  const { step, answers, email } = state;

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const { step, answers, email } = parsed;
        if (
          parsed &&
          typeof step === "string" &&
          answers &&
          typeof email === "string"
        ) {
          dispatch({ type: "HYDRATE", payload: parsed });
        }
      }
    } catch (e) {
      console.warn("Failed to read quiz state", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const data = {
      step,
      answers,
      email,
    };

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("Failed to save quiz state", e);
    }
  }, [step, answers, email, isHydrated]);

  const handleAnswerSelect = (questionId, optionId) => {
    dispatch({
      type: "SELECT_ANSWER",
      payload: { questionId, optionId },
    });
  };

  const handleNext = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const handleEmailSubmit = (value) => {
    dispatch({
      type: "SUBMIT_EMAIL",
      payload: { email: value.trim() },
    });
  };

  const handleRestart = () => {
    dispatch({ type: "RESTART" });
    window.localStorage.removeItem(STORAGE_KEY);
  };

  if (!isHydrated) {
    return (
      <div className="app">
        <header className="header">
          <h1>Mini Quiz</h1>
        </header>
        <main className="main">
          <div className="card loader-card">Loading quiz...</div>
        </main>
        <footer className="footer">
          Mini quiz • React + Vite • minimal stack
        </footer>
      </div>
    );
  }

  let content = null;

  if (step === "question1" || step === "question2") {
    const index = step === "question1" ? 0 : 1;
    const question = questions[index];

    content = (
      <QuestionScreen
        question={question}
        selectedOptionId={answers[question.id]}
        onSelect={handleAnswerSelect}
        step={step}
        onNext={handleNext}
      />
    );
  } else if (step === "email") {
    content = <EmailScreen email={email} onSubmit={handleEmailSubmit} />;
  } else {
    content = (
      <ResultScreen
        email={email}
        questions={questions}
        answers={answers}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Mini Quiz</h1>
      </header>

      <main className="main">
        <Progress
          step={step}
          answers={answers}
          totalQuestions={questions.length}
        />
        <div className="card">{content}</div>
      </main>

      <footer className="footer">
        Mini quiz • React • no extra dependencies
      </footer>
    </div>
  );
}

export default App;
