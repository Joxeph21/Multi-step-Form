import { createContext, useContext, useReducer } from "react";

const FormContext = createContext();

const initialState = {
  step: 1,
  formProgressStatus: "In progress",
  isAuthenticated: false,
  authenticatingStatus: "idle",
};

function reducer(state, action) {
  switch (action.type) {
    case "nextStep":
      return {
        ...state,
        step: state.step + action.payload,
      };
    case "selectStep":
      return {
        ...state,
        step: (state.step = action.payload),
      };
    case "authenticate": {
      return {
        ...state,
        authenticatingStatus: "authenticating",
      };
    }
    case "rejected": {
      return {
        ...state,
        authenticatingStatus: "rejected",
      };
    }
    case "authenticating":
      return {
        ...state,
        authenticatingStatus: "successful",
        isAuthenticated: true,
      };
    case "formComplete":
      return {
        ...state,
        formProgressStatus: "Complete",
      };
    case "submitForm":
      if (!state.isAuthenticated && state.formProgressStatus !== "Complete")
        return;
      return {
        ...state,
      };
    default:
      throw new Error("Unknown Action");
  }
}

function BusinessProvider({ children }) {
  const [
    { step, isAuthenticated, authenticatingStatus, formProgressStatus },
    dispatch,
  ] = useReducer(reducer, initialState);

  function nextStep() {
    if (step === 5 && !isAuthenticated) return;
    if (step === 6) return;
    dispatch({ type: "nextStep", payload: 1 });
  }

  function selectStep(i) {
    dispatch({ type: "selectStep", payload: i });
  }

  function authenticate() {
    dispatch({ type: "authenticating" });
  }
  function retry() {
    dispatch({ type: "authenticate" });
  }

  function formCompleted(){
    dispatch({type: 'formComplete'})
  }

  function reject() {
    dispatch({ type: "rejected" });
  }

  return (
    <FormContext.Provider
      value={{
        step,
        isAuthenticated,
        formCompleted,
        formProgressStatus,
        authenticatingStatus,
        selectStep,
        authenticate,
        nextStep,
        reject,
        retry,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

function useForms() {
  const context = useContext(FormContext);
  if (context === undefined)
    throw new Error("Context was used outside the Provider");
  return context;
}

export { BusinessProvider, useForms };
