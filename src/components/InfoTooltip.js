import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import crash from '../images/crash.svg'
import successfully from '../images/successfully.svg'

const infoTooltip = ({ onClose, isOpen, isRegistered }) => {

  return (
    <PopupWithForm
      name="type_info-tooltip"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
    >
      <img className="popup__icon" src={isRegistered ? successfully : crash} alt="Логотип" />
      <p className="popup__title popup__title_position_center">{isRegistered ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
    </PopupWithForm>
  )
}

export default infoTooltip;