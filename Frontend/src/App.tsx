import RegisterPage from "./pages/Auth/RegisterPage";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <RegisterPage />
    </>
  );
}

export default App;
