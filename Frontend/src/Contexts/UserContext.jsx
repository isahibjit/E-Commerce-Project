import axios from "axios";
import { createContext, useEffect, useState } from "react";

const BACKEND_API = import.meta.env.VITE_BACKEND_API;
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userLoading, setUserLoading] = useState(true); 

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(BACKEND_API + "api/user/auth", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setUser(response.data.user);
        } else {
          setUser({ login: false });
        }
      } catch (error) {
        if (error.response?.status === 403) {
          console.log(error.response.data.message);
          setUser({ login: false });
        } else {
          console.log(error);
        }
      } finally {
        setUserLoading(false); // <-- important
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user, userLoading }}>
      {children}
    </UserContext.Provider>
  );
};
