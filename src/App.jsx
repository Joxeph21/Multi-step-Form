import Main from "./components/Main";
import { BusinessProvider } from "./contexts/BusinessContext";
import { AuthProvider } from "./contexts/AuthContext";
import HeaderNav from "./ui/HeaderNav";
import { DetailsProvider } from "./contexts/DetailsContext";

function App() {
  return (
    <BusinessProvider>
      <div className="grid h-[100dvh] grid-rows-[auto_1fr] overflow-hidden pl-3 sm:px-4 md:px-8 lg:px-20">
        <AuthProvider>
          <DetailsProvider>
            <HeaderNav />
            <Main />
          </DetailsProvider>
        </AuthProvider>
      </div>
    </BusinessProvider>
  );
}

export default App;
