const { SMTPClient } = require("emailjs");
require("dotenv").config();

class Mailer {
  static activeMail = async (email, key) => {
    const client = new SMTPClient({
      user: process.env.EMAIL,
      password: process.env.PASSWORD,
      host: "smtp.gmail.com",
      port: 465,
      ssl: true,
    });

    const message = {
      from: `Badr <${process.env.EMAIL}>`,
      to: `New user <${email}>`,
      subject: "Activate your account",
      text: "Activate your account open this link",
      attachment: [
        {
          data: `<html><p>Click <a href="${process.env.BACKEND_URL}/api/user/active/${key}">here</a> to active your acount</p></html>`,
          alternative: true,
        },
      ],
    };

    // send the message and get a callback with an error or details of the message that was sent
    client.send(message, function (err, message) {
      console.log(err || message);
    });
  };
  static setPass = async (email, id) => {
    const client = new SMTPClient({
      user: process.env.EMAIL,
      password: process.env.PASSWORD,
      host: "smtp.gmail.com",
      port: 465,
      ssl: true,
    });

    const message = {
      from: `Badr <${process.env.EMAIL}>`,
      to: `New user <${email}>`,
      subject: "Set new password",
      text: "set new password copy this code",
      attachment: [
        {
          data: `<html><span>Code <h1 style="color:blue;">${id}</h1></span></html>`,
          alternative: true,
        },
      ],
    };

    // send the message and get a callback with an error or details of the message that was sent
    client.send(message, function (err, message) {
      console.log(err || message);
    });
  };

  static contact = async (name, email, sub, messageInfo) => {
    const client = new SMTPClient({
      user: process.env.EMAIL,
      password: process.env.PASSWORD,
      host: "smtp.gmail.com",
      port: 465,
      ssl: true,
    });

    const message = {
      from: `${name} <${email}>`,
      to: `Badr <${process.env.EMAIL}>`,
      subject: `${sub}`,
      text: `New contact message!`,
      attachment: [
        {
          data: `<html><p>${messageInfo}</p></html>`,
          alternative: true,
        },
      ],
    };

    // send the message and get a callback with an error or details of the message that was sent
    client.send(message, function (err, message) {
      console.log(err || message);
    });
  };
}
module.exports = Mailer;
