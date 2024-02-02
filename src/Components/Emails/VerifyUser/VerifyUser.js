import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useGlobalContext } from "../../../Context/GlobalContext";

const VerifyUser = () => {
    const { email } = useParams("email");
    const { token } = useParams("token");
    const { setLoggedInUser } = useGlobalContext();
    const history = useHistory();

    useEffect(() => {
        const verifyUser = async () => {
            const response = await fetch(
                "https://reapi.pabnafoods.com/api/verify-user",
                {
                    method: "POST",
                    body: JSON.stringify({
                        email,
                        token,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );
            const data = await response.json();
            if (!data.success && !data.token) {
                history.push(`/invalid/${data.message}`);
            } else {
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("userId", data.user.id);
                sessionStorage.setItem("userName", data.user.name);
                sessionStorage.setItem("userEmail", data.user.email);
                setLoggedInUser(data.user);
                history.push("/home");
            }
        };
        verifyUser();
    }, []);

    return <div></div>;
};

export default VerifyUser;
