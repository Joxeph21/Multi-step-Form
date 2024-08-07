import Button from "../ui/Button";
import { useForms } from "../contexts/BusinessContext";
import { useEffect, useState } from "react";
import SMSAuthForm from "./SMSAuthForm";
import Loader from "../ui/Loader";
import failedIcon from '../assets/failedIcon.svg'
import successIcon from '../assets/successIcon.svg'

function AuthenticationForm({phone}) {
  const { isAuthenticated, authenticatingStatus, nextStep, retry } = useForms();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSMSAuth() {
    retry();
    setLoading(true);
    setModal(true);
  }

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        nextStep();
      }, 3000);
    }
  }, [isAuthenticated, nextStep]);

  return (
    <>
      {modal && !isAuthenticated && (
        <SMSAuthForm setModal={setModal} modal={modal} phone={phone} loading={loading} />
      )}

      {loading && authenticatingStatus === "authenticating" ? (
        <Loading />
      ) : authenticatingStatus === "idle" ? (
        <>
          <h2 className="text-2xl font-semibold">Authentication</h2>
          <p className="text-sm font-medium md:text-base">
            Keep your account secure
          </p>
          <Button type={"authenticator"} onClick={handleSMSAuth}>
            Use SMS
          </Button>
          <Button type={"authenticator"} disabled={true} >Use an Authenticator App</Button>
        </>
      ) : (
        <OTPResult
          nextStep={nextStep}
          authenticatingStatus={authenticatingStatus}
          handleSMSAuth={handleSMSAuth}
          isAuthenticated={isAuthenticated}
        />
      )}
    </>
  );
}

function OTPResult({ authenticatingStatus, handleSMSAuth }) {
  if (authenticatingStatus === "successful")
    return (
      <div className="w-90 flex flex-col items-center justify-center gap-4 rounded-sm bg-green-100 py-10 text-center text-green-500">
        <img src={successIcon} alt="Auth_successful_img" />
        <p>Authentication Successful ✅</p>
      </div>
    );

  return (
    <div className="w-90 flex flex-col items-center justify-center gap-3 rounded-sm bg-red-100 py-10 text-center text-red-500">
      <img src={failedIcon} alt="Auth_failed_img" />
      <p>❗User Authentication Failed</p>
      <button className="text-red-500 underline" onClick={handleSMSAuth}>
        Retry
      </button>
    </div>
  );
}

function Loading() {
  return (
    <div className="w-90 flex flex-col items-center justify-center gap-2 py-20 text-center">
      <Loader />
      <p>Authenticating....</p>
    </div>
  );
}

export default AuthenticationForm;
