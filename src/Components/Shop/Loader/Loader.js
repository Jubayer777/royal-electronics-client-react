import React from "react";
import { CircleLoader } from "react-spinners";

const Loader = ({ loading }) => {
    return <CircleLoader color={"orange"} loading={loading} size={60} />;
};

export default Loader;
