import BusinessStructureForm from "../forms/BusinessForms/BusinessStructureForm";
import BussinessRepForm from "../forms/BusinessForms/BussinessRepForm";
import BusinessDetailsForm from "../forms/BusinessForms/BusinessDetailsForm";
import Overview from "../forms/Overview";
import BankDetailsForm from "../forms/BankDetailsForm";
import AuthenticationForm from "../forms/AuthenticationForm";
import { useForms } from "../contexts/BusinessContext";



function Form() {



  const { step } = useForms();

  const componentMap = {
    1: <BusinessStructureForm />,
    2: <BussinessRepForm />,
    3: <BusinessDetailsForm />,
    4: <BankDetailsForm />,
    5: <AuthenticationForm  />,
    6: <Overview />,
  };

  function handleSubmit(e) {
    if (step !== 6) {
      e.preventDefault();
    } else {
      return;
    }
  }

  return (
    <form className="overflow-y-auto" onSubmit={(e) => handleSubmit(e)}>
      <div className="flex w-full max-w-[28rem] flex-col gap-8 px-2 pr-4 sm:pr-10 md:w-1/2 md:min-w-96 md:px-8">
        {componentMap[step]}
      </div>
    </form>
  );
}

export default Form;
