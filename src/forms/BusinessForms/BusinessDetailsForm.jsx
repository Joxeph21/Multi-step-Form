import { useReducer, useCallback, useEffect, useRef } from "react";
import InputField from "../../ui/InputField";
import Button from "../../ui/Button";
import { useAuth } from "../../contexts/AuthContext";
import { useForms } from "../../contexts/BusinessContext";
import { useDetails } from "../../contexts/DetailsContext";
import { businessIndustryOptions } from "../SelectOption";

const initialState = {
  vat: "",
  industry: "",
  website: "",
  errors: {
    vat: false,
    industry: false,
    website: false,
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

function BusinessDetailsForm() {
  const { nextStep } = useForms();
  const { formComplete, isComplete, stepComplete, step3Complete, nextForm } =
    useAuth();
  const [{ vat, industry, website, errors }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const { updateDetails } = useDetails();

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
    vat,
    industry,
    website,
  };

  const checkComplete = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      const isCompleteForm = !!(vat && industry);
      if (isCompleteForm) {
        formComplete(isCompleteForm);
      }
    }, 100);
  }, [vat, industry, formComplete]);

  useEffect(() => {
    checkComplete();
    // Cleanup on unmount
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [checkComplete]);

  function handleFormStep(e) {
    e.preventDefault();
    updateDetails(details);
    stepComplete(3);
    nextStep();
    nextForm();
  }

  return (
    <>
      <h2 className="text-2xl font-semibold">Business Details</h2>
      <div>
        <label htmlFor="vat" className="text-sm font-medium md:text-base">
          VAT
        </label>
        <InputField
          name="vat"
          fieldType={"number"}
          placeholder="VAT number"
          value={vat}
          onChange={handleChange}
          onBlur={handleEmpty}
          fieldError={errors.vat}
        />
      </div>
      <div>
        <label htmlFor="industry" className="text-sm font-medium md:text-base">
          Industry
        </label>
        <InputField
        type={'select'}
        options={businessIndustryOptions}
          name="industry"
          placeholder="Please select your industry"
          value={industry}
          onChange={handleChange}
          onBlur={handleEmpty}
          fieldError={errors.industry}
        />
      </div>
      <div>
        <label htmlFor="website" className="text-sm font-medium md:text-base">
          Organization website{" "}
          <span className="text-sm text-stone-400">(optional)</span>
        </label>
        <InputField
          name="website"
          placeholder="www.example.com"
          value={website}
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

export default BusinessDetailsForm;
