// routes/AppRoutes.jsx
import ProtectedRoute from "../components/shared/ProtectedRoute";
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Doctors from "../pages/public/Doctors";
import DoctorProfile from "../pages/public/DoctorProfile";
import Contact from "../pages/public/Contact";
import Specialists from "../pages/public/Specialists";
import SpecialDoctor from "../pages/public/SpecialDoctors";
import Book from "../pages/public/Book";
import PatientProfile from "../pages/public/PatientProfile";
import PublicLayout from "../layouts/PublicLayout";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Blogs from "../pages/public/Blogs";
import BlogDetail from "../pages/public/BlogDetail";
import Register from "../pages/auth/Register";

const AppRoutes = () => (
  <Routes>
    {/* Public Pages */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register/>} />
    <Route element={<PublicLayout />}>
      <Route path="/" element={<Home />} index />
      <Route path="/home" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="doctors" element={<Doctors />} />
      <Route path="doctor/:id" element={<DoctorProfile />} />
      <Route path="contact" element={<Contact />} />
      <Route path="specials" element={<Specialists />} />
      <Route path="specials/:id" element={<SpecialDoctor />} />
      <Route path="blogs" element={<Blogs />} />
      <Route path="blogs/:id" element={<BlogDetail />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<PatientProfile />} />
        <Route path="/book" element={<Book />} />
      </Route>
    </Route>
  </Routes>
);
export default AppRoutes;
