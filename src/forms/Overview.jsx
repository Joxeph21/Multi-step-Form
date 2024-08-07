import Button from "../ui/Button";
import ok from "../assets/ok.png";

function Overview() {
  return (
    <>
      <h2 className="text-2xl font-semibold">Registration Successful</h2>
      <img src={ok} className="mt-2 mb-2" alt="succesful_img" />
      <Button type={"primary"}>Proceed</Button>
    </>
  );
}

export default Overview;
