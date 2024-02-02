import routes from "redis-commander/lib/routes";
import { axiosInstance } from "../Helper/ApiCall/ApiCall";

export const checkAdmin = async (id) => {
    axiosInstance
        .post(routes.adminCheck, {
            user_id: id,
        })
        .then((res) => res.json())
        .then((data) => {
            return data.success;
        })
        .catch((err) => {
            return false;
        });
};
