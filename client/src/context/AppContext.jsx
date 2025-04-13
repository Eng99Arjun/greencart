import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);

    const value = { showUserLogin, setShowUserLogin, navigate, user, setUser, isSeller, setIsSeller };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};