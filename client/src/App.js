import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Pagenotfound from "../src/pages/Pagenotfound";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicePage from "./pages/ServicePage";
import ContactPage from "./pages/ContactPage";
import AllServices from "./pages/AllServices";
import AllNews from "./pages/AllNews";
import AllProjects from "./pages/AllProjects";
import AdminPage from "../src/AdminPages/Home";
import CreateCard from "../src/AdminPages/pages/CreateCard";
import CreateClientCard from "../src/AdminPages/pages/CreateClientCard";
import CreateNewsCard from "../src/AdminPages/pages/CreateNewsCard";
import CreateHomeCard from "../src/AdminPages/pages/CreateHomeCard";
import CreateProjectCard from "../src/AdminPages/pages/CreateProjectCard";
import Cards from "../src/AdminPages/update and getCard/getCard";
import UpdateCard from "../src/AdminPages/update and getCard/UpdateCard";
import GetClientCard from "../src/AdminPages/UpdateAndGetClientCards/GetClientCard";
import UpdateClientCard from "./AdminPages/UpdateAndGetClientCards/UpdateClientCard";
import GetHomeCard from "./AdminPages/UpdateAndGetHomeCard/GetHomeCard";
import UpdateHomeCard from "./AdminPages/UpdateAndGetHomeCard/UpdateHomeCard";
import GetNewsCard from "./AdminPages/UpdateAndGetNewsCard/GetNewsCard";
import UpdateNewsCard from "./AdminPages/UpdateAndGetNewsCard/UpdateNewsCard";
import GetProjectCard from "./AdminPages/UpdateAndGetProjectCard/GetProjectCard";
import UpdateProjectCard from "./AdminPages/UpdateAndGetProjectCard/UpdateProjectCard";
import LoginForm from "./pages/LoginForm";
import ForgotPassword from "./pages/ForgotPassword";
import GetTrainingCard from "./AdminPages/UpdateAndGetTrainingCards/GetTrainingCard";
import UpdateTrainingCard from "./AdminPages/UpdateAndGetTrainingCards/UpdateTrainingCard";
import CreateTrainingCard from "./AdminPages/pages/CreateTrainingCard";
import UploadPdf from "./pages/UploadPdf";
import PdfViewer from "../src/AdminPages/pdfViewer/PdfViewer"

function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in (e.g., by verifying token in local storage)
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Routes>
      <Route path="*" element={<Pagenotfound />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/service" element={<ServicePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/all-services" element={<AllServices />} />
      <Route path="/all-news" element={<AllNews />} />
      <Route path="/all-projects" element={<AllProjects />} />
      <Route path="/upload-pdf" element={<UploadPdf />} />
      <Route path="/admin-login-metabot" element={<LoginForm />} />
      <Route path="/admin-login-metabot-forgot-password" element={<ForgotPassword/>} />
      {isLoggedIn && (
        <>
          <Route path="/dashboard-admin" element={<AdminPage />} />
          <Route path="/dashboard-admin/get-trainings" element={<PdfViewer />} />
          <Route path="/dashboard-admin/create-card" element={<CreateCard />} />
          <Route path="/dashboard-admin/create-client-card" element={<CreateClientCard />} />
          <Route path="/dashboard-admin/create-news-card" element={<CreateNewsCard />} />
          <Route path="/dashboard-admin/create-home-card" element={<CreateHomeCard />} />
          <Route path="/dashboard-admin/create-project-card" element={<CreateProjectCard />} />
          <Route path="/dashboard-admin/create-training-card" element={<CreateTrainingCard />} />
          <Route path="/dashboard-admin/get-card" element={<Cards />} />
          <Route path="/dashboard-admin/update-card/:id" element={<UpdateCard />} />
          <Route path="/dashboard-admin/get-client-card" element={<GetClientCard />} />
          <Route path="/dashboard-admin/update-client-card/:id" element={<UpdateClientCard />} />
          <Route path="/dashboard-admin/get-home-card" element={<GetHomeCard />} />
          <Route path="/dashboard-admin/update-home-card/:id" element={<UpdateHomeCard />} />
          <Route path="/dashboard-admin/get-news-card" element={<GetNewsCard />} />
          <Route path="/dashboard-admin/update-news-card/:id" element={<UpdateNewsCard />} />
          <Route path="/dashboard-admin/get-project-card" element={<GetProjectCard />} />
          <Route path="/dashboard-admin/update-project-card/:id" element={<UpdateProjectCard />} />
          <Route path="/dashboard-admin/get-training-card" element={<GetTrainingCard />} />
          <Route path="/dashboard-admin/update-training-card/:id" element={<UpdateTrainingCard />} />
        </>
      )}
    </Routes>
  );
}

export default App;
