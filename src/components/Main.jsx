
import Form from "./Form";
import SideBar from "./SideBar";

function Main() {
  return (
    <main className="grid grid-cols-[auto_1fr] gap-4 overflow-hidden py-12 md:gap-14">
     
      <SideBar />
        <Form />
 
    </main>
  );
}

export default Main;
