import React from "react";
import Button from "./Button";
import Header from "./Header";
import Footer from "./Footer";
// import { AuthContext } from "../AuthProvider";

const Main = () => {
  // const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  return (
    <>
      {/* Main */}
      <div className="container">
        <div className="p-5 text-center bg-light-dark rounded">
          <h1 className="text-light">Stock Prediction Portal</h1>
          <p className="text-white lead">
            This portal uses a machine learning model to analyze historical
            stock prices and predict the next day’s closing price. It also
            visualizes trends using moving averages and evaluates model
            performance using standard metrics.
          </p>
          <small className="text-warning">
            ⚠️ For educational purposes only. Not financial advice.
          </small>
          <br />
          <Button
            text="Explore Now"
            class="btn-outline-info m-4"
            url="/dashboard"
          />
          :
        </div>
      </div>
    </>
  );
};

export default Main;
