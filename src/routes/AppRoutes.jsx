// routes/AppRoutes.jsx
import { ROLES } from "../utils/roleUtils";
import ProtectedRoute from "../auth/ProtectedRoute";
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Doctors from "../pages/public/Doctors";
import DoctorProfile from "../pages/public/DoctorProfile";
import Contact from "../pages/public/Contact";
import Specialists from "../pages/public/Specialists";
import SpecialDoctor from "../pages/public/SpecialDoctors";
import Book from "../pages/public/Book";
import PatientProfile from "../pages/public/PatientProfile";
import DoctorLayout from "../layouts/DoctorLayout";
import AdminLayout from "../layouts/AdminLayout";
import PublicLayout from "../layouts/PublicLayout";
import { Route, Routes } from "react-router-dom";
import DoctorDashboard from "../pages/dashboard/doctor/DoctorDashboard";
import DoctorAppointment from "../pages/dashboard/doctor/DoctorAppointments";
import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";

const AppRoutes = () => (
  <Routes>
    {/* Public Pages */}
    <Route element={<PublicLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="doctors" element={<Doctors />} />
      <Route path="doctor/:id" element={<DoctorProfile />} />
      <Route path="contact" element={<Contact />} />
      <Route path="specials" element={<Specialists />} />
      <Route path="specials/:id" element={<SpecialDoctor />} />
    </Route>

    {/* Patient-only pages (no dashboard layout) */}
    <Route element={<ProtectedRoute allowedRoles={[ROLES.PATIENT]} />}>
      <Route path="/profile" element={<PatientProfile />} />
      <Route path="/book" element={<Book />} />
    </Route>

    {/* Doctor dashboard */}
    <Route element={<ProtectedRoute allowedRoles={[ROLES.DOCTOR]} />}>
      <Route path="/doctor" element={<DoctorLayout />}>
        <Route index element={<DoctorDashboard />} />
        <Route path="appointments" element={<DoctorAppointment />} />
      </Route>
    </Route>

    {/* Admin dashboard */}
    <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<ManageUsers />} />
      </Route>
    </Route>
  </Routes>
);
export default AppRoutes;
