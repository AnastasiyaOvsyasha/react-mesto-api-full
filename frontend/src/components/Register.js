import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = data;
    onRegister({ email, password });
  }

  return (
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <h2 className="register__text">Регистрация</h2>
        <label htmlFor="email" className="register__html_lable"></label>
        <input
          type="email"
          className="register-form__input register-form__input_email"
          id="email-register"
          name="email"
          placeholder="Email"
          required
          value={data.email}
          onChange={handleChange}
        />
        <label htmlFor="password" className="register__html_lable"></label>
        <input
          type="password"
          className="register-form__input register-form__input_password"
          id="password-register"
          name="password"
          placeholder="Пароль"
          required
          value={data.password}
          onChange={handleChange}
        />
        <button type="submit" className="register__button-reg">
          Зарегистрироваться
        </button>
      </form>
      <div className="register__login-link">
        <p className="register__title">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__signin">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
