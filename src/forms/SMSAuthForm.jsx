import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import InputField from "../ui/InputField";
import Modal from "../ui/Modal";
import { useForms } from "../contexts/BusinessContext";
import Loader from "../ui/Loader";
import { verifyCode } from "../services/OTPverification";
import { useDetails } from "../contexts/DetailsContext";

function SMSAuthForm({ setModal }) {
  const { business } = useDetails();
  const { authenticate, reject } = useForms();
  const [verifying, setVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);

  const Inputrefs = useRef([]);
  const timerRef = useRef(null);

  const [seconds, setSeconds] = useState(30);

  const timeUp = seconds === 0;

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current); // Clean up the timer on component unmount
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(timerRef.current);
          return 0;
        }
      });
    }, 1000);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setSeconds(30);
    startTimer();
  };

  const handleInputChange = (index, value) => {
    if (value.length === 1) {
      setPin((prevPin) => {
        const newPin = [...prevPin];
        newPin[index] = value;
        return newPin;
      });
      if (index < 3) {
        Inputrefs.current[index + 1].focus();
      }
    }
  };

  const { representative } = business;
  const userPhone = representative?.phone;

  useEffect(() => {
    const handleKeyUp = (e) => {
      const target = e.target;
      const key = e.key.toLowerCase();

      if (key === "backspace" || key === "delete") {
        target.value = "";
        const prevSibling = target.previousElementSibling;

        if (prevSibling) {
          prevSibling.focus();
        }
      }
    };

    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const isValid = verifyCode(Number(pin.join("")));

  function verifyOTP() {
    setVerifying(true);

    if (pin.join("").length < 4) return;
    if (!isValid) {
      setTimeout(() => {
        setVerifying(false);
        setErrorMessage("Invalid OTP");
      }, 2000);
    } else {
      setTimeout(() => {
        setModal(false);
        authenticate();
      }, 2000);
    }
  }

  function cancelAuth() {
    reject();
    setModal(false);
  }

  return (
    <Modal>
      {verifying ? (
        <Loader />
      ) : (
        <>
          <div className="mb-4 grid grid-rows-2">
            <Button
              type={"link"}
              color={
                "text-red-500 mb-4 mt-2 row-span-2 h-fit w-fit justify-self-end"
              }
              onClick={cancelAuth}
            >
              cancel
            </Button>
            <h2 className="mb-3 text-center text-xl font-extrabold text-stone-950">
              Mobile Phone Verification
            </h2>
            <p className="w-80 text-wrap text-center text-xs">
              {!userPhone ? (
                "Phone number was not provided."
              ) : (
                <>
                  Enter the 4-digit verification code sent to{" "}
                  <span className="font-bold">{userPhone}</span>
                </>
              )}
            </p>
          </div>

          {errorMessage && <ErrorDiv error={errorMessage} />}

          <div className="mb-6 flex w-full items-center justify-center">
            {pin.map((p, index) => (
              <InputField
                key={index}
                type={"numeric"}
                pinError={errorMessage}
                Refs={(el) => (Inputrefs.current[index] = el)}
                value={p}
                statusMessage
                maxLength={1}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            ))}
          </div>

          <div className="space-y-3">
            <Button type={"primary"} addStyle={"w-full"} onClick={verifyOTP}>
              Verify OTP
            </Button>
            <div className="flex w-full items-center justify-center">
              <p className="w-80 text-wrap text-center text-sm text-stone-600">
                Didn&apos;t receive code?{" "}
                <Button
                  disabled={!timeUp || !userPhone}
                  type={"link"}
                  color={timeUp ? "text-[#4032da]" : "text-[#4032daae]"}
                  onClick={resetTimer}
                >
                  {timeUp || !userPhone ? "Resend" : `00:${seconds}`}
                </Button>
              </p>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}

function ErrorDiv({ error }) {
  return (
    <p className="w-full rounded-sm bg-red-200 py-2 text-center text-xs text-red-400 md:text-sm">
      {error}
    </p>
  );
}

export default SMSAuthForm;
