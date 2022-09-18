import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [values, setValues] = useState({ name: "", link: "" });

  function handleChange(evt) {
    const { value, name } = evt.target;
    setValues({ ...values, [name]: value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(values);
  }

  useEffect(() => {
    setValues({ name: "", about: "" });
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input"
        id="photo-name"
        data-input="add-photo-name-input"
        type="text"
        name="name"
        value={values.name || ""}
        onChange={handleChange}
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
      />
      <span
        className="form__input-error"
        data-input="add-photo-name-input-error"
        id="photo-name-error"
        role="status"
        aria-live="polite"
      ></span>
      <input
        className="form__input"
        data-input="add-photo-link-input"
        type="url"
        name="link"
        value={values.link || ""}
        onChange={handleChange}
        id="photo-link"
        placeholder="Ссылка на картинку"
        required
      />
      <span
        className="form__input-error"
        data-input="add-photo-link-input-error"
        id="photo-link-error"
        role="status"
        aria-live="polite"
      ></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
