import { useCallback, useEffect, useReducer, useRef } from "react";
import InputField from "../../ui/InputField";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../ui/Button";
import { useDetails } from "../../contexts/DetailsContext";
import { useForms } from "../../contexts/BusinessContext";
import { businessTypeOptions } from "../SelectOption";

const initialState = {
  businessAddress: "",
  businessType: null,
  address: "",
  address2: "",
  city: "",
  zip: "",
  errors: {
    businessAddress: false,
    businessType: false,
    address: false,
    address2: false,
    city: false,
    zip: false,
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

function BusinessStructure() {
  const { nextStep } = useForms();
  const { formComplete, isComplete, stepComplete, nextForm } = useAuth();
  const { updateBusinessStructure } = useDetails();
  const [
    { businessAddress, businessType, address, address2, city, zip, errors },
    dispatch,
  ] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
    if (value) {
      dispatch({ type: "SET_ERROR", field: name, value: false });
    }
  };

  const debounceTimeoutRef = useRef();

  const details = {
    businessAddress,
    businessType,
    address,
    address2,
    city,
    zip,
  };

  const checkComplete = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      const isCompleteForm = !!(
        businessAddress &&
        businessType &&
        address &&
        city &&
        zip
      );
      if (isCompleteForm) {
        formComplete(isCompleteForm);
      }
    }, 100);
  }, [businessAddress, formComplete, businessType, address, city, zip]);

  useEffect(() => {
    checkComplete();
    // Cleanup on unmount
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [businessAddress, businessType, address, city, zip, checkComplete]);

  const handleEmpty = (e) => {
    const { name, value } = e.target;
    if (!value) {
      dispatch({ type: "SET_ERROR", field: name, value: true });
    } else {
      dispatch({ type: "SET_ERROR", field: name, value: false });
    }
  };

  const handleFormStep = (e) => {
    e.preventDefault();
    updateBusinessStructure(details);
    stepComplete(1);
    nextStep();
    nextForm();
  };

  return (
    <>
      <h2 className="text-2xl font-semibold md:text-3xl">Business Structure</h2>

      <div className="flex flex-col gap-8">
        <div>
          {Object.values(errors).some((error) => error) && (
            <p className="mb-2 w-full rounded-sm bg-red-200 py-2 text-center text-xs text-red-400 md:text-sm">
              All fields are required
            </p>
          )}
          <label
            htmlFor="businessAddress"
            className="text-sm font-medium md:text-base"
          >
            Business Name
          </label>
          <InputField
            fieldError={errors.businessAddress}
            name="businessAddress"
            onBlur={(e) => handleEmpty(e)}
            placeholder="Registered Business Name"
            value={businessAddress}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="businessType"
            className="text-sm font-medium md:text-base"
          >
            Type
          </label>
          <InputField
            fieldError={errors.businessType}
            onBlur={(e) => handleEmpty(e)}
            options={businessTypeOptions}
            type={"select"}
            name="businessType"
            placeholder="Type of business"
            value={businessType}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label htmlFor="address" className="text-sm font-medium md:text-base">
          Address
        </label>
        <InputField
          fieldError={errors.address}
          onBlur={(e) => handleEmpty(e)}
          name="address"
          placeholder="Address line 1"
          value={address}
          onChange={handleChange}
        />
        <InputField
          name="address2"
          placeholder="Address line 2"
          value={address2}
          onChange={handleChange}
        />
        <InputField
          fieldError={errors.city}
          onBlur={(e) => handleEmpty(e)}
          name="city"
          placeholder="City"
          value={city}
          onChange={handleChange}
        />
        <InputField
          fieldError={errors.zip}
          onBlur={(e) => handleEmpty(e)}
          name="zip"
          fieldType={"number"}
          placeholder="Zip"
          value={zip}
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

export default BusinessStructure;
