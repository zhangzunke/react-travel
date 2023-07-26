import { useEffect } from "react";
import styles from "./App.module.css";
import {
  HomePage,
  RegisterPage,
  SearchPage,
  ShoppingCartPage,
  SignInPage,
} from "./pages";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DetailPage } from "./pages/detail";
import { useAppDispatch, useSelector } from "./redux/hooks";
import { getShoppingCart } from "./redux/shoppingCart/slice";

const PrivateRoute = ({ children }) => {
  const jwt = useSelector((state) => state.user.token);
  return jwt ? children : <Navigate to="/signin" />;
};

function App() {
  const jwt = useSelector(s => s.user.token);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if(jwt) {
      dispatch(getShoppingCart(jwt));
    }
  }, [jwt, dispatch]);
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/signIn" element={<SignInPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route
            path="/detail/:touristRouteId"
            element={<DetailPage />}
          ></Route>
          <Route path="/search/:keywords?" element={<SearchPage />}></Route>
          <Route
            path="/shoppingCart"
            element={
              <PrivateRoute>
                <ShoppingCartPage />
              </PrivateRoute>
            }
          ></Route>
          <Route path="*" element={<h1>404 Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
