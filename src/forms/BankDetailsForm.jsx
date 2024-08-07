import { useReducer, useCallback, useEffect, useRef } from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { useAuth } from "../contexts/AuthContext";
import { useForms } from "../contexts/BusinessContext";
import { currencyOptions, countryOptions } from "./SelectOption";
import { useDetails } from "../contexts/DetailsContext";

const initialState = {
  currency: "",
  country: "",
  iban: "",
  swiftCode: "",
  errors: {
    currency: false,
    country: false,
    iban: false,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "SET_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.value,
        },
      };
    default:
      return state;
  }
};

function BankDetailsForm() {
  const { nextStep, selectStep, isAuthenticated } = useForms();
  const { updateBankDetails } = useDetails();
  const { formComplete, isComplete, stepComplete, nextForm } = useAuth();
  const [{ currency, country, iban, swiftCode, errors }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
    if (value) {
      dispatch({ type: "SET_ERROR", field: name, value: false });
    }
  };

  const handleEmpty = (e) => {
    const { name, value } = e.target;
    if (!value) {
      dispatch({ type: "SET_ERROR", field: name, value: true });
    } else {
      dispatch({ type: "SET_ERROR", field: name, value: false });
    }
  };

  const debounceTimeoutRef = useRef();

  const details = {
    currency,
    country,
    iban,
    swiftCode,
  };

  const checkComplete = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      const isCompleteForm = !!(currency && country && iban);
      if (isCompleteForm) {
        formComplete(isCompleteForm);
      }
    }, 100);
  }, [currency, country, iban, formComplete]);

  useEffect(() => {
    checkComplete();

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [checkComplete]);

  function handleFormStep(e) {
    e.preventDefault();
    updateBankDetails(details);
    stepComplete(4);
    if (isAuthenticated) {
      selectStep(6);
    } else {
      nextStep();
      nextForm();
    }
  }

  return (
    <>
      <h2 className="text-2xl font-semibold">Bank Details</h2>
      <div>
        <label htmlFor="currency" className="text-sm font-medium md:text-base">
          Currency
        </label>
        <InputField
          type={"select"}
          options={currencyOptions}
          name="currency"
          placeholder="Select your preferred currency"
          value={currency}
          onChange={handleChange}
          onBlur={handleEmpty}
          fieldError={errors.currency}
        />
      </div>
      <div>
        <label htmlFor="country" className="text-sm font-medium md:text-base">
          Country of bank account
        </label>
        <InputField
          type={"select"}
          options={countryOptions}
          name="country"
          placeholder="Bank Country"
          value={country}
          onChange={handleChange}
          onBlur={handleEmpty}
          fieldError={errors.country}
        />
      </div>
      <div>
        <label htmlFor="iban" className="text-sm font-medium md:text-base">
          IBAN
        </label>
        <InputField
          name="iban"
          fieldType={"number"}
          placeholder="Enter your IBAN"
          value={iban}
          onChange={handleChange}
          onBlur={handleEmpty}
          fieldError={errors.iban}
        />
      </div>
      <div>
        <label htmlFor="swiftcode" className="text-sm font-medium md:text-base">
          Swift Code
          <span className="ml-2 text-sm text-stone-500">(optional)</span>
        </label>
        <InputField
          name="swiftCode"
          fieldType={"number"}
          placeholder="Swift Code"
          value={swiftCode}
          onChange={handleChange}
        />
      </div>
      <Button
        disabled={!isComplete}
        type={"primary"}
        onClick={(e) => handleFormStep(e)}
      >
        Continue &rarr;
      </Button>
    </>
  );
}

export default BankDetailsForm;
