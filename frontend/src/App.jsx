// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import HomePage from "./pages/HomePage/HomePage";
import SignInPage from "./pages/SignInPage/SigninPage";
import SignUpPage from "./pages/SignUpPage/SignupPage";
import RecipesPage from "./pages/RecipesPage/RecipesPage";

//Components
import Header from "./components/Header/Header";
import FooterComponent from "./components/Footer/Footer";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import FavoutiteRecipesPage from "./pages/RecipesPage/FavoutiteRecipesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/favouriterecipes" element={<FavoutiteRecipesPage />} />
        <Route element={<PrivateRoute />}>
          {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
        </Route>
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
