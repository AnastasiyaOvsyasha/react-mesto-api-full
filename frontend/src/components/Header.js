import React from "react";
import Logo from '../images/logo.svg'
import { Route, Link } from "react-router-dom";

function Header({ email, onLogOut }) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={Logo}
        alt="логотип сайта Mesto Russia" />
        <Route exact path="/">
        <div className="header__menu">
            <p className="header__email">{email}</p>
            <button className="header__button-out" onClick={onLogOut}>
                Выйти
            </button>
        </div>
    </Route>
    <Route path="/sign-in">
        <Link to="/sign-up" className="header__link">
            Регистрация
        </Link>
    </Route>
    <Route path="/sign-up">
        <Link to="/sign-in" className="header__link">
            Войти
        </Link>
    </Route>
</header>

);
}

export default Header;
