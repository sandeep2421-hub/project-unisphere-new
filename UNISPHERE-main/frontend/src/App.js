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
import Internships from "./Internships";
import InternshipDetails from "./InternshipDetails";
import Hackathons from "./Hackathons";
import HackathonDetails from "./HackathonDetails";
import Attendance from "./Attendance";
import Library from "./Library";
import LibraryDetails from "./LibraryDetails";
import AcademicCalendar from "./AcademicCalendar";
import ExamSchedule from "./ExamSchedule";
import Grades from "./Grades";
import Certificates from "./Certificates";
import Cgpa from "./Cgpa";
import Projects from "./Projects";
import Research from "./Research";
import Payments from "./Payments";
import Wallet from "./Wallet";
import PaymentReceipts from "./PaymentReceipts";
import LibraryDue from "./LibraryDue";
import Fines from "./Fines";
import Hostel from "./Hostel";
import HostelLeave from "./HostelLeave";
import HostelChange from "./HostelChange";
import MessChange from "./MessChange";
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
        <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
        <Route path="/internships" element={<ProtectedRoute><Internships /></ProtectedRoute>} />
        <Route path="/internships/:id" element={<ProtectedRoute><InternshipDetails /></ProtectedRoute>} />
        <Route path="/hackathons" element={<ProtectedRoute><Hackathons /></ProtectedRoute>} />
        <Route path="/hackathons/:id" element={<ProtectedRoute><HackathonDetails /></ProtectedRoute>} />
        <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
        <Route path="/library/:id" element={<ProtectedRoute><LibraryDetails /></ProtectedRoute>} />
        <Route path="/academic-calendar" element={<ProtectedRoute><AcademicCalendar /></ProtectedRoute>} />
        <Route path="/exam-schedule" element={<ProtectedRoute><ExamSchedule /></ProtectedRoute>} />
        <Route path="/grades" element={<ProtectedRoute><Grades /></ProtectedRoute>} />
        <Route path="/certificates" element={<ProtectedRoute><Certificates /></ProtectedRoute>} />
        <Route path="/cgpa" element={<ProtectedRoute><Cgpa /></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
        <Route path="/research" element={<ProtectedRoute><Research /></ProtectedRoute>} />
        <Route path="/chatroom" element={<ProtectedRoute><ChatRoom /></ProtectedRoute>} />
        <Route path="/assignment" element={<ProtectedRoute><Assignment /></ProtectedRoute>} />
        <Route path="/unispherehub" element={<ProtectedRoute><UniSphereHub /></ProtectedRoute>} />
        <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
        <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
        <Route path="/payment-receipts" element={<ProtectedRoute><PaymentReceipts /></ProtectedRoute>} />
        <Route path="/library-due" element={<ProtectedRoute><LibraryDue /></ProtectedRoute>} />
        <Route path="/fines" element={<ProtectedRoute><Fines /></ProtectedRoute>} />
        <Route path="/hostel" element={<ProtectedRoute><Hostel /></ProtectedRoute>} />
        <Route path="/hostel-leave" element={<ProtectedRoute><HostelLeave /></ProtectedRoute>} />
        <Route path="/hostel-change" element={<ProtectedRoute><HostelChange /></ProtectedRoute>} />
        <Route path="/mess-change" element={<ProtectedRoute><MessChange /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
