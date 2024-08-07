import { createContext, useContext, useReducer } from "react";

const detailsContext = createContext();

const initialState = {
  business: {
    structure: {},
    representative: {},
    details: {},
  },
  bankDetails: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_BUSINESS_STRUCTURE":
      return {
        ...state,
        business: {
          ...state.business,
          structure: state.structure = action.payload,
        },
      };

    case "UPDATE_BUSINESS_REPRESENTATIVE":
      return {
        ...state,
        business: {
          ...state.business,
          representative: state.representative = action.payload,
        },
      };

    case "UPDATE_BUSINESS_DETAILS":
      return {
        ...state,
        business: {
          ...state.business,
          details: state.details = action.payload,
        },
      };

    case "UPDATE_BANK_DETAILS":
      return {
        ...state,
        bankDetails: [...state.bankDetails, action.payload],
      };

    default:
      throw new Error("Unknown Action");
  }
}

function DetailsProvider({ children }) {
  const [{ business, bankDetails }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  function updateBusinessStructure(structure){
    dispatch({ type: "UPDATE_BUSINESS_STRUCTURE", payload: structure });
  }

  const updateRepresentative = (representative) => {
    dispatch({
      type: "UPDATE_BUSINESS_REPRESENTATIVE",
      payload: representative,
    });
  };

  const updateDetails = (details) => {
    dispatch({ type: "UPDATE_BUSINESS_DETAILS", payload: details });
  };

  const updateBankDetails = (bankDetails) => {
    dispatch({ type: "UPDATE_BANK_DETAILS", payload: bankDetails });
  };

  return (
    <detailsContext.Provider
      value={{
        bankDetails,
        business,
        updateBusinessStructure,
        updateRepresentative,
        updateDetails,
        updateBankDetails,
      }}
    >
      {children}
    </detailsContext.Provider>
  );
}

function useDetails() {
  const context = useContext(detailsContext);
  if (!context) throw new Error("Context used Outside Provider");
  return context;
}

export { DetailsProvider, useDetails };
