import { useState, useEffect } from "react";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import Tables from "./components/tables/Tables";
import Auth from "./context/auth";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!!JSON.parse(localStorage.getItem("Token"))) {
      setToken(JSON.parse(localStorage.getItem("Token")));
      setUser(JSON.parse(localStorage.getItem("User")));
    } else {
      setUser(null);
    }
  }, [setToken, token, setUser, user]);

  return (
    <>
      <Auth.Provider value={{ setToken, token, user, setUser }}>
        {!token ? (
          <>
            <Navbar />
            <Login />
          </>
        ) : (
          <>
            <Navbar /> <Tables />
          </>
        )}
      </Auth.Provider>
    </>
  );
}

export default App;
