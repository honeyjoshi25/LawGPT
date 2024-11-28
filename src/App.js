import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Login/Login";
import { SignUp } from "./Pages/SignUp/SignUp";
import { RecoverPassword } from "./Pages/RecoverPassword/RecoverPassword";
import { PrivacyPolicy } from "./Pages/PrivacyPolicy/PrivacyPolicy";
import { DocumentView } from "./Pages/DocumentView/DocumentView";
import { FAQs } from "./Pages/FAQs/FAQs";
import { AboutUs } from "./Pages/AboutUs/AboutUs";
import { Company } from "./Pages/Company/Company";
import { Resources } from "./Pages/Resources/Resources";
import { useContext, useEffect } from "react";
import { HeaderContext } from "./Context/Context";

function App() {
  const { pathname } = useLocation();
  const { darkMode } = useContext(HeaderContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="App" data-theme={darkMode ? "dark" : "light"}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/company" element={<Company />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/document" element={<DocumentView />} />
      </Routes>
    </div>
  );
}

export default App;
