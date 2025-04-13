import axios from "axios";
import { createContext, useEffect, useState } from "react";

const BACKEND_API = import.meta.env.VITE_BACKEND_API;
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(BACKEND_API + "api/user/auth", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setUser(response.data.user);
        }
      } catch (error) {
        if (error.status === 403) {
          console.log(error.response.data.message);
          setUser({ login: false });
        }
        console.log(error);
      }
    })();
  }, []);
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
