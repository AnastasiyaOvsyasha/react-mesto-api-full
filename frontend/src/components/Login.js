import React, { useState } from "react";

function Login({ onLogin }) {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(data);
  }

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__text">Вход</h2>
        <label htmlFor="email" className="login__label"></label>
        <input
          type="email"
          className="login-form__input login-form__input_email"
          id="email-login"
          name="email"
          placeholder="Email"
          required
          value={data.email}
          onChange={handleChange}
        />
        <label htmlFor="password" className="login__label"></label>
        <input
          type="password"
          className="login-form__input login-form__input_password"
          id="password-login"
          name="password"
          placeholder="Пароль"
          required
          value={data.password}
          onChange={handleChange}
        />
        <button type="submit" className="login__button-in">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
