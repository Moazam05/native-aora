import { useContext, createContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite"; // Import function to fetch user

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Automatically check if user is logged in on app load
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const loggedInUser = await getCurrentUser(user?.accountId);
        if (loggedInUser) {
          setIsLogged(true);
          setUser(loggedInUser);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
