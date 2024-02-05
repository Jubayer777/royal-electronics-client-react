import React, {
    createContext,
    useContext,
    useLayoutEffect,
    useState,
} from "react";
import { axiosInstance } from "../Helper/ApiCall/ApiCall";
import { routes } from "../Utils/Constant";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const checkAdmin = async (id) => {
        try {
            const res = await axiosInstance.post(routes.adminCheck, {
                user_id: id,
            });
            setIsAdmin(res.data.success);
            return res.data.success;
        } catch (err) {
            setIsAdmin(false);
            return false;
        }
    };
    useLayoutEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            checkAdmin(userId);
        }
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                cart,
                setCart,
                loggedInUser,
                setLoggedInUser,
                isAdmin,
                setIsAdmin,
                checkAdmin,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
