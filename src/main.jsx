import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
// import SecurityProvider from "./components/SecurityProvider";

// Lazy load heavy components to chunk the main bundle
const Home = lazy(() => import("./components/Home.jsx"));
const Work = lazy(() => import("./components/Work.jsx"));
const About = lazy(() => import("./components/About.jsx"));
const Contact = lazy(() => import("./components/Contact.jsx"));

// Minimal loading placeholder for layout painting transitions
const PageLoader = () => <div className="w-full h-96 bg-transparent" />;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <SecurityProvider> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route
              index
              element={
                <Suspense fallback={<PageLoader />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="work"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Work />
                </Suspense>
              }
            />
            <Route
              path="about"
              element={
                <Suspense fallback={<PageLoader />}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="contact"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Contact />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    {/* </SecurityProvider> */}
  </React.StrictMode>
);