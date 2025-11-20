const initialState = {
  step: "question1",
  answers: {},
  email: "",
};

export default function quizReducer(state, action) {
  switch (action.type) {
    case "HYDRATE": {
      return {
        ...state,
        step: action.payload.step,
        answers: action.payload.answers || {},
        email: action.payload.email || "",
      };
    }

    case "SELECT_ANSWER": {
      const { questionId, optionId } = action.payload;

      if (state.answers[questionId]) {
        return state;
      }

      return {
        ...state,
        answers: {
          ...state.answers,
          [questionId]: optionId,
        },
      };
    }

    case "NEXT_STEP": {
      if (state.step === "question1") {
        return { ...state, step: "question2" };
      }
      if (state.step === "question2") {
        return { ...state, step: "email" };
      }
      return state;
    }

    case "SUBMIT_EMAIL": {
      return {
        ...state,
        email: action.payload.email,
        step: "result",
      };
    }

    case "RESTART": {
      return {
        step: "question1",
        answers: {},
        email: "",
      };
    }

    default:
      return state;
  }
}

export { initialState };
