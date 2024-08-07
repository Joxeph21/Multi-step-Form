import { useForms } from "../contexts/BusinessContext";
import { useAuth } from "../contexts/AuthContext";
import CheckMark from "./Checkmark";

function Pagination() {
  const { step, isAuthenticated } = useForms();
  const { step1Complete, step2Complete, step3Complete, step4Complete } =
    useAuth();

  const isActive = (i) => {
    if (i === 1 && step1Complete) {
      return `bg-green-400 text-stone-50`;
    }

    if (i === 4 && step4Complete) {
      return `bg-green-400 text-stone-50`;
    }
    if (i === 5 && isAuthenticated) {
      return `bg-green-400 text-stone-50`;
    }
    return step === i
      ? `bg-[#4A3AFF] text-stone-50`
      : `bg-stone-50 text-stone-900`;
  };
  const isActivespan = (i) => {
    if (i === 2 && step2Complete) {
      return `bg-green-400 text-stone-50`;
    }
    if (i === 3 && step3Complete) {
      return `bg-green-400 text-stone-50`;
    }
    return step === i ? `bg-[#4A3AFF]` : `bg-stone-400`;
  };

  return (
    <div className="flex h-[max-content] flex-col items-center rounded-full bg-[#D9D9D9]/40 px-1">
      <p
        className={`mb-4 mt-1 inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-center text-sm font-medium ${isActive(1)}`}
      >
        {step1Complete ? <CheckMark /> : "1"}
      </p>
      <p className="mb-7 flex flex-col items-center gap-4">
        <span
          className={`h-2 w-2 cursor-pointer rounded-full transition-all duration-100 md:hover:bg-blue-600 ${isActivespan(2)}`}
        ></span>
        <span
          className={`h-2 w-2 cursor-pointer rounded-full transition-all duration-100 md:hover:bg-blue-600 ${isActivespan(3)}`}
        ></span>
      </p>
      <p
        className={`mb-4 inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-center text-sm font-medium ${isActive(4)}`}
      >
        {step4Complete ? <CheckMark /> : "2"}
      </p>
      <p
        className={`mb-4 inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-center text-sm font-medium ${isActive(5)}`}
      >
        {isAuthenticated ? <CheckMark /> : "3"}
      </p>
      <p
        className={`mb-1 inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-center text-sm font-medium ${isActive(6)}`}
      >
        4
      </p>
    </div>
  );
}

export default Pagination;
