import * as React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/Layout";
import SmoothScroll from "./components/layout/SmoothScroll";
import CustomCursor from "./components/layout/CustomCursor";
import LoadingScreen from "./components/layout/LoadingScreen";
import PageTransition from "./components/layout/PageTransition";
import FloatingActionDock from "./components/FloatingActionDock";
import { useDevice } from "./hooks/useDevice";

const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Products = React.lazy(() => import("./pages/Products"));
const Gallery = React.lazy(() => import("./pages/Gallery"));
const Quality = React.lazy(() => import("./pages/Quality"));
const Export = React.lazy(() => import("./pages/Export"));
const Contact = React.lazy(() => import("./pages/Contact"));
const GetQuote = React.lazy(() => import("./pages/GetQuote"));

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<PageTransition><Home /></PageTransition>} />
          <Route path="about" element={<PageTransition><About /></PageTransition>} />
          <Route path="products" element={<PageTransition><Products /></PageTransition>} />
          <Route path="gallery" element={<PageTransition><Gallery /></PageTransition>} />
          <Route path="quality" element={<PageTransition><Quality /></PageTransition>} />
          <Route path="export" element={<PageTransition><Export /></PageTransition>} />
          <Route path="contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="get-quote" element={<PageTransition><GetQuote /></PageTransition>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const { isLowEnd } = useDevice();

  return (
    <BrowserRouter>
      <LoadingScreen />
      {!isLowEnd && <CustomCursor isLowEnd={isLowEnd} />}
      <SmoothScroll isLowEnd={isLowEnd}>
        <FloatingActionDock />
        <AnimatedRoutes />
      </SmoothScroll>
    </BrowserRouter>
  );
}
