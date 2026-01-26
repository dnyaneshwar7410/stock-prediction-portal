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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique
            quisquam quas vitae exercitationem dignissimos perspiciatis, totam,
            assumenda neque delectus at optio adipisci eligendi ab voluptas
            recusandae? Soluta ratione blanditiis vero.
          </p>
          <Button text="Explore Now" class="btn-outline-info" url='/dashboard' />:
        </div>
      </div>
    </>
  );
};

export default Main;
