import React, { useState, useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isPreloader }) => {

  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const [isValid, setIsValid] = useState(false);
  const avatarRef = useRef();

  const errorClsInput = errorMessage && 'form__field_type_error';

  const handleChangeAvatar = (e) => {
    setValue(e.target.value);

    if (!e.target.validity.valid) {
      setIsValid(false);
      setErrorMessage(e.target.validationMessage);
    } else {
      setErrorMessage('');
      setIsValid(true);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    setValue('');
    setErrorMessage('');
    setIsValid(false);
  }, [isOpen]);

  return (
    <PopupWithForm
      name="type_avatar"
      formTitle="Обновить аватар"
      btnTitle="Обновить"
      preloaderBtnTitle="Обновление..."
      btnIsValid={isValid}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isPreloader={isPreloader}
    >
      <div className="form__input-wrapper">
        <input
          className={`form__field ${errorClsInput}`}
          ref={avatarRef}
          id="input-link-avatar"
          type="url"
          name="avatar"
          value={value || ''}
          onChange={handleChangeAvatar}
          placeholder="Ссылка на фото"
          required
        />
        <span className="form__validation-error">
          {errorMessage}
        </span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;