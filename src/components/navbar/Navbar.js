import React, { useContext } from "react";
//EXTERNAL COMPONENTS
import { UserOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

//INTERNAL COMPONENTS
import S from "./Navbar.module.scss";
import { logoutFunction } from "../../services/loginRequest";
import Auth from "../../context/auth";

const Navbar = () => {
  const { token, setToken, user } = useContext(Auth);
  const logOutUser = async () => {
    try {
      const resp = await logoutFunction(token);
      setToken(resp);
      localStorage.clear();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={!user ? S.navbarLoginUserContainer : S.navbarContainer}>
      <div>
        <h1 className={S.title}>
          RE<span>S</span>TO!
        </h1>
      </div>
      <div className={S.userTextContainer}>
        {!user ? (
          <>
            <LoginOutlined style={{ fontSize: "50px", color: "white" }} />
            <p className={S.userText}>Por favor, inicie sesión !</p>
          </>
        ) : (
          <>
            <UserOutlined style={{ fontSize: "50px", color: "white" }} />
            <p className={S.userText}>
              Bienvenido <span>{user}</span> !
            </p>
            <Popconfirm
              title="Desea salir?"
              onConfirm={logOutUser}
              cancelText="No, gracias"
              okText="Si"
            >
              <LogoutOutlined
                style={{ fontSize: "50px", color: "white" }}
              />
            </Popconfirm>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
