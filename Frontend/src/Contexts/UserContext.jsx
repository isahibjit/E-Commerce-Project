import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

 export const UserContext = createContext();
const BACKEND_API = import.meta.env.VITE_BACKEND_API
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
            BACKEND_API + "api/user/auth"
        ,{withCredentials : true});
        
      } catch (error) {
        if (error.status === 403) {
          console.log(error.response.data.message);
          setUser(null);
        }
        console.log(error);
      }
    })();
  }, []);
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
