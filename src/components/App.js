import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeletePlacePopup from './DeletePlacePopup.js';
import InfoTooltip from './InfoTooltip.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js'
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import * as auth from '../utils/auth'

const App = () => {

  const [currentUser, setCurrentUser] = useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPreloaderBtn, setIsPreloaderBtn] = useState(false);
  const [isInfoTooltipPopupOpen, setIisInfoTooltipPopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();


  // Валидацию пока не хватило времени и ума как сделать правильно(

  // Бургерное меню тоже не реализовано из-за нехватки времени до дедлайна, но в процессе доделаю


  /*const [validationData, setValidationData] = useState({
    isValid: {},
    errorMessage: {}
  })*/

/*  const checkValidityInput = (input) => {
    if (!input.validity.valid) {
      setValidationData((prev) => ({
        ...prev,
        isValid: {
          ...prev,
          [input.name]: false
        },
        errorMessage: {
          ...prev,
          [input.name]: input.validationMessage
        }
      }))
    } else {
      setValidationData((prev) => ({
        ...prev,
        isValid: {
          ...prev,
          [input.name]: true
        },
        errorMessage: {
          ...prev,
          [input.name]: ''
        }
      }))
        }
  }*/

  useEffect(() => {
    checkJwt();
  }, [])

  const checkJwt = () => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth.checkJwt(jwt)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          navigate('/');
        }).catch(err => {
        console.log(`Ошибка: ${ err }`)
      })
    }
  }

  useEffect(() => {

    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        }).catch(err => {
        console.log(`Ошибка: ${ err }`)
      })
    }
  },[loggedIn])

  const handleUpdateUser = (inputData) => {
    setIsPreloaderBtn(true);
    api.setUserInfo(inputData)
      .then((UserInfo) => {
        setCurrentUser(UserInfo);
        closeAllPopups();
      }).catch(err => {
      console.log(`Ошибка: ${ err }`)
    }).finally(() => {
      setIsPreloaderBtn(false);
    })
  }

  const handleUpdateAvatar = (avatarUrl) => {
    setIsPreloaderBtn(true);
    api.setUserAvatar(avatarUrl)
      .then((UserAvatar) => {
        setCurrentUser(UserAvatar);
        closeAllPopups();
      }).catch(err => {
      console.log(`Ошибка: ${ err }`)
    }).finally(() => {
      setIsPreloaderBtn(false);
    })
  }

  const handleAddPlaceSubmit = (inputData) => {
    setIsPreloaderBtn(true);
    api.uploadCard(inputData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      }).catch(err => {
      console.log(`Ошибка: ${ err }`)
    }).finally(() => {
      setIsPreloaderBtn(false);
    })
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((stateCard) => stateCard._id === card._id ? newCard : stateCard));
      }).catch(err => {
      console.log(`Ошибка: ${ err }`);
    })
  }

  const handleCardDelete = (card) => {
    setIsPreloaderBtn(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((stateCard) => stateCard._id !== card._id && stateCard));
        closeAllPopups();
      }).catch(err => {
      console.log(`Не удалось удалить фото-карточку ${ err }`);
    }).finally(() => {
      setIsPreloaderBtn(false);
    })
  }

  const handleCardClick = (card) => setSelectedCard(card);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleDeletePlaceClick = (place) => setCardToDelete(place);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIisInfoTooltipPopupOpen(false);
    setSelectedCard({});
    setCardToDelete({});
  }

  const handleRegister = (password, email) => {
    setIsPreloaderBtn(true);
    auth.register(password, email)
      .then(() => {
        setIsRegistered(true);
      }).catch(err => {
      console.log(`Не удалось зарегистрироваться ${ err }`);
      setIsRegistered(false);
    }).finally(() => {
      setIsPreloaderBtn(false);
      setIisInfoTooltipPopupOpen(true);
    })
  }

  const handleLogin = (password, email) => {
    setIsPreloaderBtn(true);
    auth.login(password, email)
      .then((jwt) => {
        localStorage.setItem('jwt', jwt.token)
        setLoggedIn(true);
        navigate('/');
      }).catch(err => {
      console.log(`Не удалось войти ${ err }`);
    }).finally(() => {
      setIsPreloaderBtn(false);
    })
  }

  const handleSingOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header userEmail={userEmail} handleSingOut={handleSingOut} />
        <Routes>
          <Route path="/" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  isCards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeletePlaceClick}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/sign-up" element={<Register onRegister={handleRegister} isPreloader={isPreloaderBtn} />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} isPreloader={isPreloaderBtn} />} />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isPreloader={isPreloaderBtn}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isPreloader={isPreloaderBtn}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUploadCard={handleAddPlaceSubmit}
          isPreloader={isPreloaderBtn}
        />
        <DeletePlacePopup
          card={cardToDelete}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          isPreloader={isPreloaderBtn}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isRegistered={isRegistered}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
