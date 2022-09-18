import React from "react";
import success from "../images/auth-yes.svg";
import fail from "../images/auth-no.svg";

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_place_infotool">
        <button className="popup__close-icon" onClick={props.onClose}></button>
          <img className="popup__tooltip-image" src={props.type ? success : fail} alt= {props.type ? 'иконка успешной регистрации' : 'иконка не успешной регистрации'} />
          <p className="popup__title popup__title_place_tooltip">
            {props.type
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </p>
        </div>
      </div>
  );
}

export default InfoTooltip;