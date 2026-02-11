import './App.css';
import Login from './login';
import Intro from './intro';
import Reg from './reg';
import MyCampus from "./MyCampus";
import UniSphereHub from "./UniSphereHub";
import Home from './home';
import ProtectedRoute from "./ProtectedRoute";
import DetailsForm from "./form";
import Timetable from "./timetable";
import Assignment from "./assignment";
import CoursePage from './coursepage';
import Chatfeature from "./ChatCollaborate";
import ChatRoom from "./ChatRoom";
import GeneralChat from "./generalchat";
import Events from "./events";
import Qs from "./Qp";
import F_p from "./ForgotPassword";
import { BrowserRouter,Route,Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/reg" element={<Reg />} />
        <Route path="/fp" element={<F_p />} />
        <Route path="/details" element={<ProtectedRoute><DetailsForm /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/mycampus" element={<ProtectedRoute><MyCampus /></ProtectedRoute>} />
        <Route path="/coursepage" element={<ProtectedRoute><CoursePage /></ProtectedRoute>} />
        <Route path="/timetable" element={<ProtectedRoute><Timetable /></ProtectedRoute>} />
        <Route path="/chatfe" element={<ProtectedRoute><Chatfeature /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><GeneralChat /></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path="/qs" element={<ProtectedRoute><Qs /></ProtectedRoute>} />
        <Route path="/chatroom" element={<ProtectedRoute><ChatRoom /></ProtectedRoute>} />
        <Route path="/assignment" element={<ProtectedRoute><Assignment /></ProtectedRoute>} />
        <Route path="/unispherehub" element={<ProtectedRoute><UniSphereHub /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
