import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `photos__delete ${
    isOwn ? "" : "photos__delete_disabled"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `photos__like-button ${
    isLiked ? "photos__like-button_liked" : ""
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card._id);
  }

  return (
    <div className="template">
      <li className="photos__card">
        <button
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}
          aria-label="удалить фотографию"
          type="button"
        />
        <img
          className="photos__image"
          src={card.link}
          alt={card.name}
          onClick={handleCardClick}
        />
        <div className="photos__box-info">
          <h2 className="photos__title">{card.name}</h2>
          <div>
            <button
              className={cardLikeButtonClassName}
              onClick={handleLikeClick}
              aria-label="поставить лайк фото"
              type="button"
            />
            <p className="photos__like-counter">{card.likes.length}</p>
          </div>
        </div>
      </li>
    </div>
  );
}

export default Card;
