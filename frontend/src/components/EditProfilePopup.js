import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import React from 'react';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [userName, setUserName] = useState("");
  const [userDescription, setUserChangeDescription] = useState("");

  function handleNameChange(evt) {
    setUserName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setUserChangeDescription(evt.target.value);
  }

  React.useEffect(() => {
    setUserName(currentUser.name);
    setUserChangeDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: userName,
      about: userDescription,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input"
        data-input="edit-profile-name-input"
        id="profile-name"
        type="text"
        value={userName || ""}
        onChange={handleNameChange}
        name="form__input_type_text"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
      />
      <span
        className="form__input-error"
        data-input="edit-profile-name-input-error"
        id="profile-name-error"
      ></span>
      <input
        className="form__input"
        data-input="edit-profile-about-input"
        id="profile-about"
        type="text"
        value={userDescription || ""}
        onChange={handleDescriptionChange}
        name="form__input_type_about"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
      />
      <span
        className="form__input-error"
        data-input="edit-profile-about-input-error"
        id="profile-about-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
