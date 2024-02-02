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
    const checkAdmin = (id) => {
        axiosInstance
            .post(routes.adminCheck, {
                user_id: id,
            })
            .then((res) => {
                setIsAdmin(res.data.success);
            })
            .catch((err) => {
                setIsAdmin(false);
            });
    };
    useLayoutEffect(() => {
        const userId = sessionStorage.getItem("userId");
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
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
