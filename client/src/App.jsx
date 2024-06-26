import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/navigation/Header";
import Home from "./components/screens/Home";
import About from "./components/otherComponents/About/About";
import AllServices from "./components/otherComponents/Services/AllServices";
import Contact from "./components/otherComponents/Contact/Contact";
import Login from "./components/otherComponents/Forms/Login/Login";
import Register from "./components/otherComponents/Forms/Register/Register";
import Error from "./components/shared/ErrorComponent/Error";
import Breadcrumb from "./components/shared/BreadCrumb/BreadCrumb";
import LawyerRegister from "./components/otherComponents/Forms/Register/LawyerRegister";
import LawyerLogin from "./components/otherComponents/Forms/Login/LawyerLogin";
import ForgotPassword from "./components/otherComponents/Forms/ForgotPassword/ForgotPassword";
import LawyerForgotPassword from "./components/otherComponents/Forms/ForgotPassword/LawyerForgotPassword";
import Departments from "./components/otherComponents/Departments/Departments";
import TermsandConditions from "./components/otherComponents/TermsandConditions/TermsandConditions";
import Footer from "./components/navigation/Footer";
import PrivacyPolicy from "./components/otherComponents/PrivacyPolicy/PrivacyPolicy";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/about"
          element={
            <Breadcrumb>
              <About />
            </Breadcrumb>
          }
        />

        <Route
          path="/services"
          element={
            <Breadcrumb>
              <AllServices />
            </Breadcrumb>
          }
        />

        <Route
          path="/departments"
          element={
            <Breadcrumb>
              <Departments />
            </Breadcrumb>
          }
        />

        <Route
          path="/terms-and-conditions"
          element={
            <Breadcrumb>
              <TermsandConditions />
            </Breadcrumb>
          }
        />

        <Route
          path="/privacy-policy"
          element={
            <Breadcrumb>
              <PrivacyPolicy />
            </Breadcrumb>
          }
        />

        <Route
          path="/contact-us"
          element={
            <Breadcrumb>
              <Contact />
            </Breadcrumb>
          }
        />

        <Route
          path="/client-login"
          element={
            <Breadcrumb>
              <Login />
            </Breadcrumb>
          }
        />

        <Route
          path="/client-register"
          element={
            <Breadcrumb>
              <Register />
            </Breadcrumb>
          }
        />

        <Route
          path="/reset-password"
          element={
            <Breadcrumb>
              <ForgotPassword />
            </Breadcrumb>
          }
        />

        <Route
          path="/lawyer-register"
          element={
            <Breadcrumb>
              <LawyerRegister />
            </Breadcrumb>
          }
        />

        <Route
          path="/lawyer-login"
          element={
            <Breadcrumb>
              <LawyerLogin />
            </Breadcrumb>
          }
        />

        <Route
          path="/lawyer-reset-password"
          element={
            <Breadcrumb>
              <LawyerForgotPassword />
            </Breadcrumb>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
