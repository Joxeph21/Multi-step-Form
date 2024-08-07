import CreatableSelect from "react-select/creatable";

function InputField({
  pinError,
  options,
  name,
  fieldType,
  fieldError,
  placeholder,
  onBlur,
  Refs,
  value,
  onChange,
  type,
  maxLength,
}) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      marginTop: "16px",
      width: "100%",
      borderRadius: "0.5rem",
      borderWidth: state.isFocused ? "none" : "1px",
      borderColor: state.isFocused ? (fieldError ? "#E3342F" : null) : null,
      boxShadow: state.isFocused
        ? fieldError
          ? "0 0 0 1px #E3342F"
          : "0 0 0 4px rgb(96 165 250 / 0.3)"
        : null,
      padding: "0.5rem",
      "&:hover": {
        borderColor: state.isFocused
          ? fieldError
            ? "#E3342F"
            : "#9B9B9B"
          : "#D2D6DC",
      },
      animation: fieldError ? "shake 0.5s" : "none", 
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.5rem",
      marginTop: "0.25rem",
    }),
    option: (provided, state) => ({
      ...provided,
      padding: "0.5rem 1rem",
      backgroundColor: state.isFocused ? "#E2E8F0" : "#FFF",
      color: state.isFocused ? "#1A202C" : "#1A202C",
      "&:active": {
        backgroundColor: "#EDF2F7",
      },
    }),
  };

  if (type === "numeric")
    return (
      <input
        ref={Refs}
        type="numeric"
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        className={`mr-4 h-14 w-12 rounded-[4px] bg-stone-100 text-center focus:outline-none focus:ring-1 ${
          pinError ? `shake ring-1 ring-red-300` : `focus:ring-[#4032dabe]`
        }`}
      />
    );

  if (type === "select")
    return (
      <CreatableSelect
        styles={customStyles}
        value={options.find((option) => option.value === value)}
        options={options}
        onBlur={onBlur}
        onChange={(selectedOption) =>
          onChange({
            target: {
              name,
              value: selectedOption ? selectedOption.value : null,
            },
          })
        }
        placeholder={placeholder}
        classNamePrefix={fieldError ? "shake" : ""} 
      />
    );

  return (
    <input
      className={`mt-[16px] w-full rounded-lg border px-3 py-2 transition-all duration-100 placeholder:text-sm focus:outline-none focus:ring ${
        fieldError ? `shake ring-1 ring-red-600` : `focus:ring-blue-400/30`
      } md:placeholder:text-base`}
      id={name}
      type={fieldType}
      value={value}
      name={name}
      onChange={onChange}
      autoComplete="on"
      onBlur={onBlur}
      placeholder={placeholder}
    />
  );
}

export default InputField;
