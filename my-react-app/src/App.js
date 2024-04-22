import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import WelcomePage from "./pages/Client/WelcomePage";
import ProfileInfo from "./pages/Client/ProfileInfo"
import ProfileInfo1 from "./pages/Client/ProfileInfo1";
import ProfileInfo2 from "./pages/Client/ProfileInfo2";
import SignInPage from "./pages/Client/SignInPage";
import SignUpPage from "./pages/Client/SignUpPage";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorMessages from "./pages/Doctor/DoctorMessages";
import DoctorPatients from "./pages/Doctor/DoctorPatients";
import DoctorSettings from "./pages/Doctor/DoctorSettings";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorTests from "./pages/Doctor/DoctorTests";




function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      default:
        // No action needed for other cases
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<WelcomePage/>}/>
      <Route path="/signup-info" element={<ProfileInfo />} />
      <Route path="/signup-info1" element={<ProfileInfo1 />} />
      <Route path="/signup-info2" element={<ProfileInfo2 />} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/doctor/dashboard" element={<DoctorDashboard/>} />
      <Route path="/doctor/appointments" element={<DoctorAppointments />} />
      <Route path="/doctor/patients" element={<DoctorPatients />} />
      <Route path="/doctor/messages" element={<DoctorMessages />} />
      <Route path="/doctor/settings" element={<DoctorSettings />} />
      <Route path="/doctor/tests" element={<DoctorTests />} />
    

    </Routes>
  );
}
export default App;
