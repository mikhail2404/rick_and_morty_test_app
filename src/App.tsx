import React, { useEffect } from "react";
import "./scss/styles.scss";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import Navbar from "./components/Navbar/Navbar";
import Characters from "./pages/Characters/Characters";
import CharacterDetails from "./pages/CharacterDetails/CharacterDetails";
import { fetchInfo } from "./store/slices/infoSlice";
import { useAppDispatch } from "./hooks/useAppDispatch";
import Login from "./pages/Login/Login";
import FavouriteList from "./pages/FavouriteList/FavouriteList";
import OverlayWithSpinner from "./components/OverlayWithSpinner/OverlayWithSpinner";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInfo());
  }, []);
  return (
    <Router>
      <OverlayWithSpinner />
      <Navbar />
      <Routes>
        <Route index element={<Characters />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
        <Route path="/favourite-list" element={<FavouriteList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/linkedin" element={<LinkedInCallback />} />
        <Route path="*" element={<Characters />} />
      </Routes>
    </Router>
  );
};

export default App;
