import React, { useState, useContext, useEffect } from "react";

//EXTERNAL COMPONENTS
import "antd/dist/antd.css";
import { Input, Button, Alert } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoginOutlined,
} from "@ant-design/icons";
import isEmail from "validator/lib/isEmail";

// INTERNAL COMPONENTS
import S from "./Login.module.scss";
import { loginFunction } from "../../services/loginRequest";
import Auth from "../../context/auth";

const Login = () => {
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState({
    email: false,
    password: false,
    emailValid: false,
  });
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(Auth);

  const handleChangeUser = ({ target }) => {
    const { value, name } = target;
    setUserLogin((userLogin) => ({ ...userLogin, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { email, password } = userLogin;
    const userAndPassword = `${email}::${password}`;
    try {
      if (isEmail(email)) {
        const resp = await loginFunction(userAndPassword);
        setToken(resp.token);
        localStorage.setItem("Token", JSON.stringify(resp.token));
        setLoading(false);
      } else {
        console.log("no soy un email");
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      setError((error) => ({
        ...error,
        emailValid: e,
      }));
    }
  };

  const checkPasswordOnBlur = () => {
    userLogin.password.length < 6
      ? setError((error) => ({ ...error, password: true }))
      : setError((error) => ({ ...error, password: false }));
  };

  const checkEmailOnBlur = () => {
    setError((error) => ({
      ...error,
      email: !isEmail(userLogin.email),
    }));
  };

  const onCloseEmailValidError = () => {
    setError((error) => ({
      ...error,
      emailValid: false,
    }));
    setUserLogin({ email: "", password: "" });
  };

  useEffect(() => {
    return () => setUserLogin({ email: "", password: "" });
  }, []);

  return (
    <div className={S.loginContainer}>
      <div className={S.blackBox}>
        <div className={S.inputContainer}>
          <Input
            allowClear
            size="large"
            name="email"
            placeholder="Por favor ingrese su correo"
            onChange={handleChangeUser}
            value={userLogin.email}
            prefix={<UserOutlined className="site-form-item-icon" />}
            onBlur={checkEmailOnBlur}
          />
          {error.email && (
            <Alert
              size="large"
              message="Por Favor ingrese un E-mail."
              type="error"
              showIcon
            />
          )}
          <Input.Password
            size="large"
            name="password"
            value={userLogin.password}
            placeholder="Por favor ingrese su password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={handleChangeUser}
            onBlur={checkPasswordOnBlur}
          />
          {error.password && (
            <Alert
              size="large"
              message="Por favor ingrese más de 6 caracteres."
              type="error"
              showIcon
            />
          )}
          <Button
            type="primary"
            icon={<LoginOutlined />}
            loading={loading}
            block
            size="large"
            onClick={handleSubmit}
            disabled={
              error.email ||
              error.password ||
              !userLogin.email ||
              !userLogin.password
            }
          >
            Log in
          </Button>
          {error.emailValid && (
            <Alert
              size="large"
              message="No se encontró el email, por favor ingrese uno valido."
              closable
              onClose={onCloseEmailValidError}
              type="error"
              showIcon
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
