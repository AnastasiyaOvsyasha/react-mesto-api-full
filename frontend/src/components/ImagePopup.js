import React from 'react';

function ImagePopup(props) {
 return (
  <div className={`popup popup-photos ${props.isOpen && 'popup_opened'}`}>
  <div className="popup-photos__container">
      <figure className="popup-photos__wrap">
        <img className="popup-photos__bigsize-image" src={`${props.card.link}`} alt={props.card.name}/>
        <figcaption className="popup-photos__caption">{props.card.name}</figcaption>
      </figure>
      <button className="popup__close-icon popup-photos__close-icon" aria-label="завершить просмотр" onClick={props.onClose} />
    </div>
  </div>
  );
 }

 export default ImagePopup;