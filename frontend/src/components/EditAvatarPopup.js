import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarInputRef = useRef("");

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
  }
  useEffect(() => {
    avatarInputRef.current.value = "";
  }, [isOpen]);

  return (
   <PopupWithForm
   name="type_avatar"
   buttonText="Сохранить"
   title="Обновить аватар"
   isOpen={isOpen}
   onClose={onClose}
   onSubmit={handleSubmit}
 >
   <input
     className="form__input"
     name="form__input_update_avatar"
     type="url"
     id="avatar-link"
     ref={avatarInputRef}
     data-input="avatar-link-input"
     aria-label="ссылка"
     placeholder="Ссылка на обновление аватара профиля"
     required
   />
   <span
     className="form__input-error"
     data-input="avatar-link-input-error"
   ></span>
 </PopupWithForm>
  );
}

export default EditAvatarPopup;
