import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { decode as base64_decode } from "base-64";


const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const { email } = useParams("email");
  const { token } = useParams("token");

  let decodedEmail = "";
  let decodedToken = "";

  try {
    decodedEmail = base64_decode(email);
    decodedToken = base64_decode(token);
  } catch (error) {

  }

  const [info, setInfo]=useState({});
    const handleBlur=e=>{
        const newInfo = {...info};
        newInfo[e.target.name]=e.target.value;
        setInfo(newInfo);
    }

  const submitHandler = (event) => {
    event.preventDefault();
    const changePassword = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/api/reset-password",
        {
          method: "POST",
          body: JSON.stringify({
            email: decodedEmail,
            token: decodedToken,
            password: info.password,
            password_confirmation: info.confirmPassword,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        alert(data.message)
        history.replace("/login");
      } else {
        history.replace(`/invalid/${data.message}`);
      }
    };

    changePassword();
  };

  return (
    <div className="notify-container">
      <div>
        <h2 className="reset_element">Reset Your Password</h2>
        <form id="forgot-form" onSubmit={submitHandler}>
        <div className="email_section">
        <input readOnly type='email' name="email" className="input_field mail_field" value={decodedEmail}/>
          </div>
        <div className="product_section">
            <div className="book_half">
              <label className="input-label">Enter New Password</label>
              <br />
              <input className="input_field half_field" type='password' onBlur={handleBlur} placeholder='New Password' name="password"  required />
            </div>
            <div className="book_half">
            <label className="input-label">Confirm Password</label>
            <br />
            <input className="input_field half_field" type='password' onBlur={handleBlur} placeholder='Retype New Password' name="confirmPassword"  required />
            </div>
          </div>
          <button type="submit" className="submit-btn reset_element">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;