import { useEffect } from "react";
import { useForms } from "../contexts/BusinessContext";
import BackButton from "./BackIcon";

function HeaderNav() {
  const {
    formProgressStatus,
    step,
    selectStep,
    formCompleted,
    isAuthenticated,
  } = useForms();

  useEffect(() => {
    if (step === 6 && isAuthenticated) {
      formCompleted();
    }
  }, [step, isAuthenticated, formCompleted]);

  const status = formProgressStatus === "Complete";

  const handleBack = () => {
    if (step === 1) return;
    const i = step - 1;
    if (i === 5) {
      selectStep(4);
    } else {
      selectStep(i);
    }
  };

  const disabled = step === 1;

  return (
    <header className="flex items-center gap-2 border-b border-stone-300 py-6 sm:gap-4 sm:px-2 sm:py-8 md:gap-4 md:px-2 md:py-8">
      <p
        className={`${!disabled ? `cursor-pointer` : `cursor-not-allowed`} rounded-full bg-stone-100 px-2 py-2 font-bold text-stone-500`}
        onClick={handleBack}
      >
        <BackButton color={!disabled ? `black` : `#A0A0A0`} />
      </p>
      <h2 className="text-base font-medium">Account verification</h2>
      <span
        className={`rounded-sm ${status ? `bg-green-50 text-green-500` : `bg-violet-50 text-[#6F6FFF]`} px-1.5 py-[1px] text-xs`}
      >
        {formProgressStatus}
      </span>
    </header>
  );
}

export default HeaderNav;
