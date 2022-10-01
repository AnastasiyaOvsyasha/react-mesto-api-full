/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useCallback } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import * as auth from '../utils/auth'
import api from '../utils/Api'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup'
import ProtectedRoute from './ProtectedRoute'
import InfoTooltip from './InfoTooltip'
import Register from './Register'
import Login from './Login'

function App () {
  const history = useHistory()
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isImagePopupOpen, setImagePopupOpen] = useState(false)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isSuccessSignUp, setIsSuccessSignUp] = useState(false)

  useEffect(() => {
    if (!loggedIn) {
      return
    }
    Promise.all([api.getDataUser(), api.getInitialCardsData()])
      .then(([userData, cards]) => {
        setCurrentUser(userData)
        setCards(cards)
      })
      .catch((err) => console.log(err))
  }, [loggedIn])

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick (card) {
    setSelectedCard(card)
    setImagePopupOpen(!isImagePopupOpen)
  }

  function handleCardLike (card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id)
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        )
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateUser (newUser) {
    setLoading(true)
    api
      .setDataUser(newUser.name, newUser.about)
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar (newUserAvatar) {
    setLoading(true)
    api
      .updateUserAvatar(newUserAvatar.avatar)
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleCardDelete (_id) {
    api
      .deleteCard(_id)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== _id))
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit (newCard) {
    setLoading(true)
    api
      .addCard(newCard)
      .then((card) => {
        setCards([card, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setImagePopupOpen(false)
    setSelectedCard({})
    setIsInfoTooltipOpen(false)
  }

  function handleRegister ({ email, password }) {
    auth
      .register({ email, password })
      .then((res) => {
        setIsSuccessSignUp(true)
        setIsInfoTooltipOpen(true)
        history.push('/sign-in')
      })
      .catch((err) => {
        setIsSuccessSignUp(false)
        setIsInfoTooltipOpen(true)
        console.log(err)
      })
  }

  function handleLogin ({ email, password }) {
    auth
      .authorize({ email, password })
      .then((res) => {
        setLoggedIn(true)
        localStorage.setItem('jwt', res.token)
        history.push('/')
      })
      .catch((err) => console.log(err))
  }

  function handleSignOut () {
    auth
      .logout()
      .then(() => {
        setLoggedIn(false)
        history.push('/sign-in')
      })
      .catch((err) => console.log(err))
  }

  const checkToken = useCallback(() => {
    auth
      .checkToken()
      .then((res) => {
        if (res) {
          setLoggedIn(true)
          history.push('/')
        } else {
          setLoggedIn(false)
          history.push('/sign-in')
        }
      })
      .catch((err) => console.log(err))
  }, [history])

  useEffect(() => {
    checkToken()
  }, [checkToken])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="root">
          <Header email={currentUser?.email} onLogOut={handleSignOut} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />
          <EditProfilePopup
            buttonText="Сохранить"
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={loading}
          />
          <EditAvatarPopup
            buttonText="Сохранить"
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={loading}
          />
          <AddPlacePopup
            buttonText="Сохранить"
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={loading}
          />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            type={isSuccessSignUp}
          />
          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onCardClick={handleCardClick}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
