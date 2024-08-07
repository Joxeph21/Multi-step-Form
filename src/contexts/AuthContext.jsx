import { createContext, useCallback, useContext, useReducer } from "react";

const authContext = createContext();

const initialState = {
  step1Complete: false,
  step2Complete: false,
  step3Complete: false,
  step4Complete: false,
  isComplete: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "FORM_COMPLETE":
      return {
        ...state,
        isComplete: action.payload,
      };
    case "STEP_COMPLETE":
      return {
        ...state,
        [`step${action.payload}Complete`]: true,
      };
    case "NEXT_FORM":
      return {
        ...state,
        isComplete: false,
      };
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const formComplete = useCallback((value) => {
    dispatch({ type: "FORM_COMPLETE", payload: value });
  }, []);

  const stepComplete = useCallback((step) => {
    if (step >= 1 && step <= 4) {
      dispatch({ type: "STEP_COMPLETE", payload: step });
    } else {
      return;
    }
  }, []);

  const nextForm = useCallback(() => {
    dispatch({ type: "NEXT_FORM" });
  }, []);

  return (
    <authContext.Provider
      value={{
        ...state,
        nextForm,
        stepComplete,
        formComplete,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  const context = useContext(authContext);
  if (!context) throw new Error("Context used outside Provider");
  return context;
}

export { AuthProvider, useAuth };
