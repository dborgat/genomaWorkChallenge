import { useState, useEffect } from "react";
import Login from "./components/login/Login";
import Tables from "./components/tables/Tables";
import Auth from "./context/auth";

function App() {
  const [token, setToken] = useState(null);
  
  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("Token")));
  }, [setToken, token]);
  
  console.log("🚀 ~ file: App.js ~ line 9 ~ App ~ token", token);
  return (
    <>
      <Auth.Provider value={{ setToken, token }}>
        {!token ? <Login /> : <Tables />}
      </Auth.Provider>
    </>
  );
}

export default App;
