import React, { useState } from "react";
import "./Profile.css";

const Profile = ({ user, onClose, updateUserData }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [pet, setPet] = useState("");

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onAgeChange = (event) => {
    setAge(event.target.value);
  };
  const onPetChange = (event) => {
    setPet(event.target.value);
  };

  const onButtonSave = async () => {
    const req = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: name,
        age: age,
        pet: pet,
      }),
    };

    const response = await fetch(
      `https://facereco-backend.onrender.com/profile/${user.id}`,
      req
    );
    if (response.ok) {
      updateUserData(name, age, pet);
    } else {
      console.log("fail");
    }
    onClose();
  };

  return (
    <div className="profile-modal">
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
        <main className="pa4 black-80 w-80">
          <h1>Hello {user.name}</h1>
          <h2>Age: {user.age}</h2>
          <h2>Pet Name: {user.pet}</h2>
          <h4>Image Submitted: {Number(user.entries)}</h4>
          <p>Member Since: {new Date(user.joined).toLocaleDateString()}</p>
          <hr />
          <label className="mt2 fw6" htmlFor="user-name">
            Name:
          </label>
          <input
            onChange={onNameChange}
            className="pa2 ba w-100 mb3"
            type="text"
            name="user-name"
            id="name"
          />
          <label className="mt2 fw6" htmlFor="user-age">
            Age:
          </label>
          <input
            onChange={onAgeChange}
            className="pa2 ba w-100 mb3"
            type="number"
            name="user-age"
            id="age"
          />
          <label className="mt2 fw6" htmlFor="user-pet">
            Pet:
          </label>
          <input
            onChange={onPetChange}
            className="pa2 ba w-100 mb3"
            type="text"
            name="user-pet"
            id="pet"
          />

          <div
            className="mt4"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <button
              onClick={onButtonSave}
              className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
            >
              Cancel
            </button>
          </div>
        </main>
        <div className="modal-close" onClick={onClose}>
          &times;
        </div>
      </article>
    </div>
  );
};

export default Profile;
