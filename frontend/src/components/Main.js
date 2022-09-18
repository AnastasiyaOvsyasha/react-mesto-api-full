import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="container">
      <section className="profile">
        <img
          className="profile__avatar"
          src={currentUser.avatar}
          alt="Обновленный аватар пользователя"
        />
        <button
          className="profile__avatar-edit-button"
          aria-label="кнопка для обновления аватара"
          onClick={onEditAvatar}
        />
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            aria-label="редактировать профиль"
            type="button"
            onClick={onEditProfile}
          />
          <p className="profile__researcher">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          aria-label="добавить фотографии"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="photos">
        <ul className="photos__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
