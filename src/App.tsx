import React from "react";
import styles from "./App.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DetailPage, HomePage, RegisterPage, SignInPage } from "./pages";

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/signIn" element={<SignInPage></SignInPage>}/>
          <Route path="/register" element={<RegisterPage></RegisterPage>}/>
          <Route path="/detail/:touristRouteId" element={<DetailPage></DetailPage>}/>
          <Route path="*" element={<h1>404 Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
