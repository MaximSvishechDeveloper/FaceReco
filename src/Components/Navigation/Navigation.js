import React from "react";
import "./Navigation.css";
import AccountMenu from "../AccountMenu/AccountMenu";

const Navigation = ({ user, onRouteChange, isSignedIn, updateUserData }) => {
  if (isSignedIn) {
    return (
      <nav className="main-nav mr3 mt3">
        <AccountMenu
          user={user}
          onRouteChange={onRouteChange}
          updateUserData={updateUserData}
        />
      </nav>
    );
  } else {
    return (
      <nav className=" main-nav mr3">
        <p
          style={{ marginRight: "20px" }}
          onClick={() => onRouteChange("register")}
          className="f3 link dim underline pointer"
        >
          Register
        </p>
        <p
          onClick={() => onRouteChange("signIn")}
          className="f3 link dim underline pointer"
        >
          Sign In
        </p>
      </nav>
    );
  }
};

export default Navigation;
