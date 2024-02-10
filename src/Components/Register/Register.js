import React, { useState, useEffect, useCallback } from "react";
import validator from "validator";

const Register = ({ onRouteChange, getUserData }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMessage] = useState("");
  const [name, setName] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const saveAuthTokenInSession = (token) => {
    window.localStorage.setItem("token", token);
  };

  const onSubmitUser = useCallback(async () => {
    if (email.length === 0 || password.length === 0) {
      setErrMessage("Can't submit an empty form");
      return;
    } else if (!validator.isEmail(email) && email.length > 0) {
      setErrMessage("Invalid email format");
      setEmail("");
      return;
    } else if (!validator.isLength(password, { min: 5 })) {
      setErrMessage("Too short password");
      setPassword("");
      return;
    }
    try {
      setDisableButton(true);
      const response = await fetch(
        "https://facereco-backend.onrender.com/register",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        }
      );
      if (response.ok) {
        const { user, token } = await response.json();
        saveAuthTokenInSession(token);
        getUserData(user);
        onRouteChange("home");
      } else {
        setErrMessage("User already exists");
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setDisableButton(false);
    }
  }, [email, password, name, onRouteChange, getUserData]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        onSubmitUser();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [onSubmitUser]);

  return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                onChange={onNameChange}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                value={name}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                onChange={onEmailChange}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                value={email}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                onChange={onPasswordChange}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                value={password}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmitUser}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value={disableButton ? "Loading..." : "Register"}
              disabled={disableButton}
            />
          </div>
          <p className="f3 red db">{errMsg}</p>
        </div>
      </main>
    </article>
  );
};

export default Register;
