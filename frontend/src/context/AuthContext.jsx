import { createContext, useState, useContext, useEffect } from "react"; // <-- Import useContext here

// Create a context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isSeller, setIsSeller] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "seller") {
      setIsSeller(true);
      setIsCustomer(false);
    } else if (role === "customer") {
      setIsSeller(false);
      setIsCustomer(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isSeller, isCustomer }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);  // <-- Correctly using useContext
};
