import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

const AddPlacePopup = ({ isOpen, onClose, onUploadCard, isPreloader }) => {

  const [values, setValues] = useState({});
  const [isValidName, setIsValidName] = useState(false);
  const [isValidLink, setIsValidLink] = useState(false);
  const [errorMessageName, setErrorMessageName] = useState('');
  const [errorMessageLink, setErrorMessageLink] = useState('');

  const errorClsInputName = errorMessageName && 'form__field_type_error';
  const errorClsInputLink = errorMessageLink && 'form__field_type_error';

  const isValidBtn = isValidName && isValidLink && true;

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({
      ...prev,
      [name]: value
    }))

    if (name === "name") {
      if (!e.target.validity.valid) {
        setIsValidName(false);
        setErrorMessageName(e.target.validationMessage);
      } else {
        setIsValidName(true);
        setErrorMessageName('');
      }
    } else {
      if (!e.target.validity.valid) {
        setIsValidLink(false);
        setErrorMessageLink(e.target.validationMessage);
      } else {
        setIsValidLink(true);
        setErrorMessageLink('');
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onUploadCard({
      name: values.name,
      link: values.link,
    });
  }

  useEffect(() => {
    setValues({});
    setIsValidName(false);
    setIsValidLink(false);
    setErrorMessageLink('');
    setErrorMessageName('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name="type_card"
      formTitle="Новое место"
      btnTitle="Создать"
      preloaderBtnTitle="Создание..."
      btnIsValid={isValidBtn}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isPreloader={isPreloader}
    >
      <div className="form__input-wrapper">
        <input
          className={`form__field ${errorClsInputName}`}
          id="input-title"
          type="text"
          name="name"
          value={values.name || ''}
          onChange={handleChange}
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
        />
        <span className="form__validation-error">
          {errorMessageName}
        </span>
      </div>
      <div className="form__input-wrapper">
        <input
          className={`form__field ${errorClsInputLink}`}
          id="input-link"
          type="url"
          name="link"
          value={values.link || ''}
          onChange={handleChange}
          placeholder="Ссылка на картинку"
          required
        />
        <span className="form__validation-error">
          {errorMessageLink}
        </span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;