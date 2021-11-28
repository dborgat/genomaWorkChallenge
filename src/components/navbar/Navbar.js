import React, { useContext } from "react";
import S from "./Navbar.module.scss";
//EXTERNAL COMPONENTS
import { UserOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { Space } from "antd";

//INTERNAL COMPONENTS
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
    <div className={S.navbarContainer}>
      <div>
        <h1 className={S.title}>
          RE<span>S</span>TO!
        </h1>
      </div>
      <div className={S.userTextContainer}>
        {!user ? (
          <>
            <LoginOutlined style={{ fontSize: "50px", color: "white" }} />
            <p className={S.userText}>Bienvenidos, inicie sesión por favor!</p>
          </>
        ) : (
          <>
            <UserOutlined style={{ fontSize: "50px", color: "white" }} />
            <p className={S.userText}>
              Bien<span>ve</span>nido <span>{user}</span> !
            </p>
              <LogoutOutlined
                style={{ fontSize: "50px", color: "white"}}
                onClick={logOutUser}
              />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
