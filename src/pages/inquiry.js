import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Inquiry = () => {
  const [name, setName] = useState(""); // 「ご氏名」の部分
  const [mail, setMail] = useState(""); // 「メールアドレス」の部分
  const [message, setMessage] = useState(""); // 「お問い合わせ内容」の部分
  const sendMail = () => {
    const userID = process.env.REACT_APP_USER_ID;
    const serviceID = process.env.REACT_APP_SERVICE_ID;
    const templateID = process.env.REACT_APP_TEMPLATE_ID;
    const templateParams = {
      to_name: name,
      from_name: mail,
      message: message,
    };
    emailjs.send(serviceID, templateID, templateParams, userID).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        toast("Email送信しました!");
      },
      (err) => {
        console.log("FAILED...", err);
        toast("Email送信に失敗しました!");
      }
    );
  };
  const handleClick = (e) => {
    e.preventDefault();
    sendMail();
  };
  return (
    <div className="container" style={{ width: "28rem" }}>
      <ToastContainer />
      <form>
        <div className="lead mt-5 mb-3">お問い合わせ</div>
        <div className="form-group">
          <input
            id="name"
            type="text"
            name="name"
            className="form-control mb-3"
            placeholder="お名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autofocus
          />
          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            required
          />
          <textarea
            className="form-control mb-3"
            name="content"
            id="content"
            placeholder="お問い合わせ内容をご記載ください"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            required
          ></textarea>
          <button
            className="btn btn-lg btn-primary"
            style={{ width: "5rem" }}
            type="submit"
            onClick={handleClick}
          >
            送信
          </button>
          <a
            className="btn btn-lg btn-secondary m-2"
            style={{ width: "5rem" }}
            href="/"
          >
            戻る
          </a>
        </div>
      </form>
    </div>
  );
};
export default Inquiry;
