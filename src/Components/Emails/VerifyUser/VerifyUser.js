import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useGlobalContext } from "../../../Context/GlobalContext";
import { axiosInstance } from "../../../Helper/ApiCall/ApiCall";
import { routes } from "../../../Utils/Constant";
import { toast } from "react-toastify";

const VerifyUser = () => {
    const { email, token } = useParams();
    const { setLoggedInUser } = useGlobalContext();
    const history = useHistory();
    const verifyUser = (data) => {
        axiosInstance
            .post(routes.verifyUser, data)
            .then((res) => {
                if (!data.success) {
                    history.push(`/invalid/${res.data.message}`);
                    toast.error(res.data.message);
                } else {
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("userId", res.data.user.id);
                    localStorage.setItem("userName", res.data.user.name);
                    localStorage.setItem("userEmail", res.data.user.email);
                    setLoggedInUser(res.data.user);
                    history.push("/home");
                    toast.success(res.data.message);
                }
            })
            .catch((err) => {
                toast.error(err?.response?.statusText);
            });
    };
    useEffect(() => {
        const verifyData = {
            email,
            token,
        };
        verifyUser(verifyData);
    }, []);
    console.log(email, token);
    return <div></div>;
};

export default VerifyUser;
