import { useReducer, useCallback, useEffect, useRef } from "react";
import InputField from "../../ui/InputField";
import Button from "../../ui/Button";
import { useAuth } from "../../contexts/AuthContext";
import { useForms } from "../../contexts/BusinessContext";
import { useDetails } from "../../contexts/DetailsContext";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  address: "",
  addressbackup: "",
  city: "",
  zip: "",
  phone: "",
  errors: {
    firstname: false,
    lastname: false,
    email: false,
    address: false,
    addressbackup: false,
    city: false,
    zip: false,
    phone: false,
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

function BussinessRepForm() {
  const { updateRepresentative } = useDetails();
  const { nextStep } = useForms();
  const { formComplete, isComplete, stepComplete, step2Complete, nextForm } =
    useAuth();
  const [
    { firstname, lastname, email, addressbackup, address, city, zip, phone, errors },
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
    firstname,
    lastname,
    email,
    addressbackup,
    address,
    city,
    zip,
    phone,
  };

  const checkComplete = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      const isCompleteForm = !!(
        firstname &&
        lastname &&
        email &&
        address &&
        city &&
        zip &&
        phone
      );
      if (isCompleteForm) {
        formComplete(isCompleteForm);
      }
    }, 100);
  }, [email, address, city, firstname, lastname, phone, zip, formComplete]);

  useEffect(() => {
    checkComplete();
    // Cleanup on unmount
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [checkComplete]);

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
    updateRepresentative(details);
    stepComplete(2);
    nextStep();
    nextForm();
  };

  return (
    <>
      <h2 className="text-2xl font-semibold">Business Representative</h2>
      <div className="grid gap-x-2 md:grid-cols-2">
        <label
          htmlFor="firstname"
          className="text-sm font-medium sm:col-span-2 md:col-span-2 md:text-base"
        >
          Name
        </label>
        <InputField
          name="firstname"
          placeholder="First name"
          value={firstname}
          onChange={handleChange}
          onBlur={(e) => handleEmpty(e)}
          fieldError={errors.firstname}
        />
        <InputField
          name="lastname"
          placeholder="Last name"
          value={lastname}
          onChange={handleChange}
          onBlur={(e) => handleEmpty(e)}
          fieldError={errors.lastname}
        />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium md:text-base">
          Email
        </label>
        <InputField
          name="email"
          fieldType={"email"}
          placeholder="you@example.com"
          value={email}
          onChange={handleChange}
          onBlur={(e) => handleEmpty(e)}
          fieldError={errors.email}
        />
      </div>
      <div>
        <label htmlFor="address" className="text-sm font-medium md:text-base">
          Address
        </label>
        <InputField
          name="address"
          placeholder="Address line 1"
          value={address}
          onChange={handleChange}
          onBlur={(e) => handleEmpty(e)}
          fieldError={errors.address}
        />
        <InputField
          name="addressbackup"
          placeholder="Address line 2"
          value={addressbackup}
          onChange={handleChange}
        />
        <InputField
          name="city"
          placeholder="City"
          value={city}
          onChange={handleChange}
          onBlur={(e) => handleEmpty(e)}
          fieldError={errors.city}
        />
        <InputField
          name="zip"
          placeholder="Zip"
          value={zip}
          onChange={handleChange}
          onBlur={(e) => handleEmpty(e)}
          fieldError={errors.zip}
        />
      </div>
      <div>
        <label htmlFor="phone" className="text-sm font-medium md:text-base">
          Phone
        </label>
        <InputField
          name="phone"
          fieldType={"number"}
          placeholder="(080)-0000-0000"
          maxLength={11}
          value={phone}
          onChange={handleChange}
          onBlur={(e) => handleEmpty(e)}
          fieldError={errors.phone}
        />
      </div>

      <Button
        disabled={!isComplete || step2Complete}
        type={"primary"}
        onClick={(e) => handleFormStep(e)}
      >
        Continue &rarr;
      </Button>
    </>
  );
}

export default BussinessRepForm;
