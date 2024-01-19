import React from 'react';
import { useParams } from 'react-router';

const Invalid = () => {
    const { message } = useParams();
    return (
        <div className="notify-items">
            <h1>{message}</h1>
        </div>
    );
};

export default Invalid;