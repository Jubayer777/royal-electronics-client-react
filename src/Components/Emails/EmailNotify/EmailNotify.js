import React from 'react';
import './EmailNotify.css';

const EmailNotify = () => {
    return (
        <div className="notify-container notify-items">
            <h1>A email verification link has been sent to your Mail</h1>
            <h3>Please verify yourself to register</h3>
        </div>
    );
};

export default EmailNotify;