import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import ProductView from "./components/ProductView/ProductView";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { getProducts } from "./service/productService";
import SignIn from "./components/Auth/login";
import SignUp from "./components/Auth/signup";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Auth/signinGoogle";
import WelcomeUser from "./components/Auth/welcomeUser";
import Checkout from "./components/CheckoutForm/Checkout";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import MyOrders from "./components/MyOrder/MyOrders";

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);



  useEffect(() => {
    const fetchProducts = async () => {
      getProducts().then((data) => {
        setProducts(data);
      });
    };
    fetchProducts();
    // fetchCart();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const userData = sessionStorage.getItem("user");
  return (
    <div>
      <Router>
        <div>
          <CssBaseline />
          <Navbar handleDrawerToggle={handleDrawerToggle} />
          <Switch>
            <Route exact path="/">
              <Products products={products} handleUpdateCartQty />
            </Route>
            <Route exact path="/login">
              <SignIn />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>

            <Route exact path="/auth/google">
              <WelcomeUser />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route path="/product/:id" exact>
              <ProductView />
            </Route>
            {userData ? (
              <React.Fragment>
                <Route exact path="/cart">
                  <Cart />
                </Route>
                <Route exact path="/checkout">
                  <Checkout />
                </Route>
                <Route exact path="/myorders">
                  <MyOrders />
                </Route>
              </React.Fragment>
            ) : (
              <Redirect to="/login" />
            )}
          </Switch>
        </div>
      </Router>
      <ToastContainer autoClose={2000} />
      <Footer />
    </div>
  );
};

export default App;
