import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen && "popup_opened"
      }`}
    >
      <div className="popup__container">
        <form className="form" name={props.name} onSubmit={props.onSubmit} noValidate>
          <h3 className="form__title">{props.title}</h3>
          <fieldset className="form__fieldset">
            {props.children}
            <button
              type="submit"
              value="Сохранить"
              className="form__save-button"
            >
              {props.buttonText}
            </button>
          </fieldset>
          <button
            className="popup__close-icon popup-edit__close-icon"
            aria-label="закрыть форму профиля"
            type="reset"
            onClick={props.onClose}
          ></button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
